import React, { useEffect, useState } from "react";
import jsonData from "./code.json"; // Update the path to the actual location of your JSON file
import 'bootstrap/dist/css/bootstrap.min.css';

const JsonDisplay = () => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Display one question per page

  useEffect(() => {
    // Log the jsonData to verify its content
    console.log("Loaded JSON data:", jsonData);

    // Ensure jsonData is an object before setting it to state
    if (typeof jsonData === "object" && jsonData !== null) {
      setData(jsonData);
    } else {
      console.error("JSON data is not an object");
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleJumpToFirstPage = () => {
    setCurrentPage(1);
  };

  // Extract the keys from the data object to determine the questions
  const keys = Object.keys(data);

  // Calculate the indices of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKeys = keys.slice(indexOfFirstItem, indexOfLastItem);

  // Determine the total number of pages
  const totalPages = Math.ceil(keys.length / itemsPerPage);

  // Determine the range of page numbers to show
  const pageRange = 5; // Number of page buttons to show in pagination
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Question Bank</h1>
      {currentKeys.map((key) => (
        <div key={key} className="mb-4">
          <h1>Question.</h1>
          <textarea
            className="form-control mx-auto"
            style={{
              fontSize: "24px", // Increase font size
              width: "100%", // Adjust width as needed
              height: "200px", // Adjust height as needed
              textAlign: "center", // Center align text
              resize: "none", // Disable resizing
              display: "block",
              overflowY: "scroll", // Enable vertical scrolling
            }}
            value={key}
            readOnly
          />
          {/* <h3 className="text-center">{key}</h3> */}
          <h1>Solution</h1>
          <textarea
            className="form-control mx-auto"
            style={{
              fontSize: "24px", // Increase font size
              width: "80%", // Adjust width as needed
              height: "200px", // Adjust height as needed
              textAlign: "center", // Center align text
              resize: "none", // Disable resizing
              display: "block",
              overflowY: "scroll", // Enable vertical scrolling
            }}
            value={data[key]}
            readOnly
          />
        </div>
      ))}
      <div className="d-flex justify-content-center">
        {/* Pagination controls */}
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={handleJumpToFirstPage}
                disabled={currentPage === 1}
              >
                First
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <li
                key={startPage + index}
                className={`page-item ${currentPage === startPage + index ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(startPage + index)}
                >
                  {startPage + index}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default JsonDisplay;
