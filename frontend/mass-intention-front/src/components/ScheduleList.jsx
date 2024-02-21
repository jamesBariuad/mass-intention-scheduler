import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ScheduleList = ({ data }) => {
  data.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const printData = () => {
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
  };


  const convertShownDate = (date) =>{
    const dateToConvert = new Date(date)
    const localDate = dateToConvert.toDateString()
    const time = dateToConvert.toLocaleTimeString() 
    return  localDate+" | "+time
  }
  return (
    <>
      <div className="relative overflow-x-auto px-32 mt-3">
        <button type="button" onClick={printData} className="float-end bg-slate-500 text-white px-3 py-1 rounded">Print</button>
        <table className="w-full text-sm text-left text-gray-500 shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Intention
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry._id} className="odd:bg-white even:bg-gray-50  border-b ">
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {entry.firstName} {entry.lastName}
                </th>
                <td className="px-6 py-4">{entry.intention}</td>
                <td className="px-6 py-4">{convertShownDate(entry.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScheduleList;
