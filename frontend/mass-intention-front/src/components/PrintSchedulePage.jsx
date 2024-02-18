import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import axios from 'axios'

const PrintSchedulePage = () => {
  const serverURL = "http://localhost:8080"

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);


    axios.get(`${serverURL}/api/printFromDateRange`, {
        params: {
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate)
        }
      })
      .then(response => {
        // Handle the response data
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  };
  return (
    <>
      <div className="mt-4 mx-3 px-2 lg:px-32">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl mb-2 font-semibold">
            Choose Date Range of Schedules to Print
          </div>
          <hr />

          <div className="mt-3">
            <label
              htmlFor="startDate"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="endDate"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-black-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="float-end mt-5 font-semibold text-slate-50 bg-black mx-auto px-5 py-2 rounded-xl hover:bg-white hover:text-black hover:border-2"
          >
            Submit
          </button>
        </form>
      </div>

    </>
  );
};

export default PrintSchedulePage;
