import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import LoadingOverlay from "./LoadingOverlay";

const PrintSchedulePage = () => {
  const [loading, setLoading] = useState(false);
  const serverURL = "http://localhost:8080";

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const printData = (data) => {
    if (data.length === 0) {
      return alert("No schedules found!");
    } else {
      // Remove _id and __v keys from each object
      const formattedData = data.map((item) => {
        delete item._id;
        delete item.__v;
        item.date = convertDate(item.date);
        return item;
      });

      // Arrange by date oldest first
      formattedData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      // Convert data to Excel format
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule Data");

      // Save Excel file
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "excel",
      });
      saveAs(excelBlob, "schedule_data.xlsx");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    setLoading(true);

    axios
      .get(`${serverURL}/api/printFromDateRange`, {
        params: {
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
        },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        printData(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      })
      .finally(()=>setLoading(false));
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
      {loading && <LoadingOverlay />}
    </>
  );
};

export default PrintSchedulePage;
