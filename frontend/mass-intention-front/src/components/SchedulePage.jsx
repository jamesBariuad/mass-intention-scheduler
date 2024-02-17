import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { setHours, } from "date-fns";

const SchedulePage = () => {
  const [date, setDate] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const serverURL = "http://localhost:8080";

  const getServerData = () => {
    axios
      .get(`${serverURL}/api/futureSchedules`)
      .then((response) => {
        // Extract times from the date field of each response object
        const disabledTimesMap = {};
        response.data.forEach((item) => {
          const time = new Date(item.date);
          const dateKey = formatDate(time); // Format date as key
          const hours = String(time.getHours()).padStart(2, "0");
          const minutes = String(time.getMinutes()).padStart(2, "0");
          const timeString = `${hours}:${minutes}`;
          // Add time to corresponding date key in the map
          if (!disabledTimesMap[dateKey]) {
            disabledTimesMap[dateKey] = [];
          }
          disabledTimesMap[dateKey].push(timeString);
        });
        setDisabledTimes(disabledTimesMap);
      })
      .catch((error) => {
        console.error("Error fetching disabled times:", error);
      });
  };

  useEffect(() => {
    getServerData();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };

  const filterTime = (time) => {
    const now = new Date();
    const selectedDate = new Date(date);
    selectedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);

    // Check if the selected time is in the past for the current date
    if (date.getDate() === now.getDate() && selectedDate < now) {
      return false;
    }

    const formattedDate = formatDate(date);
    const hour = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const timeString = `${hour}:${minutes}`;

    // Check if the time is in the list of disabled times for the selected date
    return !disabledTimes[formattedDate]?.includes(timeString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    e.target.reset()
    try {
      const response = await axios.post(`${serverURL}/api/scheduleAMass`, {
        firstName: data.firstName,
        lastName: data.lastName,
        contacDetails: data.contacDetails,
        intention: data.intention,
        date: date,
      });
      alert("Mass Scheduled!", response.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to scheduleMass");
      alert("Error:", error);
    } finally {
      getServerData();
    }
  };

  return (
    <div className="mt-4 mx-3 lg:px-32">
      <div className="text-2xl mb-2 px-2 font-semibold">Schedule a Mass</div>
      <hr></hr>
      <form className="px-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <div className="mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
              type="text"
              name="firstName"
              id="firstName"
              required
              placeholder="Enter First Name"
            />
          </div>
          <div className="mt-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
              type="text"
              name="lastName"
              id="lastName"
              required
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="contactNumber"
          >
            Contact Number:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
            type="tel"
            name="contactNumber"
            id="contactNumber"
            required
            placeholder="+6391 234 6789"
          />
        </div>

        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="intention"
          >
            Intention:
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
            type="text"
            name="intention"
            id="intention"
            required
            placeholder="Enter name(s) of person(s) or family"
          />
        </div>

        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="specialComments/Instructions"
          >
            Special Comments or Instructions Regarding Intention:
          </label>
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            type="textarea"
            name="specialComments/Instructions"
            id="specialComments/Instructions"
            rows="4"
            placeholder="I.e., Birthday, Repose of a soul, number of Masses, etc."
          />
        </div>

        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="date"
          >
            Date and Time for the Mass:
          </label>
          <DatePicker
            id="date"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            showIcon
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            popperPlacement="top-end"
            minDate={new Date()}
            minTime={setHours(new Date(), 8)} // Min time at 8:00 AM
            maxTime={setHours(new Date(), 17)} // Max time at 5:00 PM
            filterTime={filterTime}
          />
        </div>

        <button
          className="mt-5 font-semibold text-slate-50 bg-black mx-auto px-5 py-2 rounded-xl hover:bg-white hover:text-black hover:border-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SchedulePage;
