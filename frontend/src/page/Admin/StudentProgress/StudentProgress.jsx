import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import style from "./Navbar.module.css";
import main from "./Main.module.css";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
// Import XLSX library for Excel
import { saveAs } from "file-saver";
import Popup from "reactjs-popup";
import Calendar from "react-calendar";
import "reactjs-popup/dist/index.css";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const StudentProgress = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [assignmentData, setAssignmentData] = useState([]);
  const [codeData, setCodeData] = useState([]);
  const [searchBatch, setSearchBatch] = useState(""); // New state for search input

  useEffect(() => {
    fetch("http://localhost:5000/adminUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData(data.data);
        if (data.data === "token expired") {
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/getAllSubmittedCodeAdmin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AllSubmittedCodeData");
        setCodeData(data.data);
      });
  }, []);

  let completedAssignments = 0;
  let notCompletedAssignments = 0;

  try {
    if (Array.isArray(codeData)) {
      codeData.forEach((assignment) => {
        if (
          assignment.testCasesStatus1 === "passed" &&
          assignment.testCasesStatus2 === "passed" &&
          assignment.testCasesStatus3 === "passed"
        ) {
          completedAssignments++;
        } else {
          notCompletedAssignments++;
        }
      });

      console.log("Completed Assignments:", completedAssignments);
      console.log("Not Completed Assignments:", notCompletedAssignments);
    } else {
      throw new Error("codeData is not an array");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  useEffect(() => {
    fetch("http://localhost:5000/assignmentData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "AssignmentData");

        setAssignmentData(data.data);
        if (data.data == "token expired") {
          window.localStorage.clear();
          window.location.replace("/");
        }
      });
  }, []);

  let allAssignments = 0;
  try {
    if (Array.isArray(assignmentData)) {
      assignmentData.forEach((assignment) => {
        allAssignments++;
      });
    } else {
      throw new Error("assignmentData is not an array");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateNumber = (status1, status2, status3) => {
    let passedCount = 0;
    if (status1 === "passed") passedCount++;
    if (status2 === "passed") passedCount++;
    if (status3 === "passed") passedCount++;

    switch (passedCount) {
      case 3:
        return 6;
      case 2:
        return 4;
      case 1:
        return 2;
      default:
        return 0;
    }
  };

  const filteredCodeData = codeData.filter(
    (student) =>
      student.userGroup &&
      student.userGroup.toLowerCase() === searchBatch.toLowerCase()
  );

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   let yPosition = 10;

  //   filteredCodeData.forEach((i) => {
  //     const number = calculateNumber(
  //       i.testCasesStatus1,
  //       i.testCasesStatus2,
  //       i.testCasesStatus3
  //     );

  //     doc.text(`Date: ${formatDate(i.createdAt)}`, 10, yPosition);
  //     doc.text(`Email: ${i.userMail}`, 10, yPosition + 10);
  //     doc.text(`Test Case 1 Status: ${i.testCasesStatus1}`, 10, yPosition + 20);
  //     doc.text(`Test Case 2 Status: ${i.testCasesStatus2}`, 10, yPosition + 30);
  //     doc.text(`Test Case 3 Status: ${i.testCasesStatus3}`, 10, yPosition + 40);
  //     doc.text(`Score: ${number}`, 10, yPosition + 50);

  //     yPosition += 60;

  //     if (yPosition > 280) {
  //       doc.addPage();
  //       yPosition = 10;
  //     }
  //   });

  //   doc.save(`Batch_${searchBatch}_Report.pdf`);
  // };
  const downloadPDFAndExcel = () => {
    generatePDF();
    generateExcel();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;

    filteredCodeData.forEach((i) => {
      const number = calculateNumber(
        i.testCasesStatus1,
        i.testCasesStatus2,
        i.testCasesStatus3
      );

      doc.text(`Date: ${formatDate(i.createdAt)}`, 10, yPosition);
      doc.text(`Email: ${i.userMail}`, 10, yPosition + 10);
      doc.text(`Test Case 1 Status: ${i.testCasesStatus1}`, 10, yPosition + 20);
      doc.text(`Test Case 2 Status: ${i.testCasesStatus2}`, 10, yPosition + 30);
      doc.text(`Test Case 3 Status: ${i.testCasesStatus3}`, 10, yPosition + 40);
      doc.text(`Score: ${number}`, 10, yPosition + 50);

      yPosition += 60;

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
    });

    doc.save(`Batch_${searchBatch}_Report.pdf`);
  };

  const generateExcel = () => {
    const data = filteredCodeData.map((i) => ({
      Date: formatDate(i.createdAt),
      Email: i.userMail,
      "Test Case 1 Status": i.testCasesStatus1,
      "Test Case 2 Status": i.testCasesStatus2,
      "Test Case 3 Status": i.testCasesStatus3,
      Score: calculateNumber(
        i.testCasesStatus1,
        i.testCasesStatus2,
        i.testCasesStatus3
      ),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batch Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), `Batch_${searchBatch}_Report.xlsx`);
  };

  return (
    <div>
      <div
        id="topbar"
        className={`${style.topbar1} d-flex align-items-center fixed-top`}
      >
        <div
          className={`${style.container} d-flex align-items-center justify-content-center justify-content-md-between`}
        >
          <div className={`${style.rightItem} d-flex align-items-center`}>
            <i className="bi bi-phone"></i>Mail us at arun@gmail.com
          </div>
        </div>
      </div>
      <header id="header" className={`${style.header1} fixed-top`}>
        <div className={`${style.container} d-flex align-items-center`}>
          <a href="/" className={`${style.logo} me-auto`}>
            <img
              className="img-fluid rounded-circle shadow-sm"
              src="/log-in.png"
              alt=""
              style={{ width: "50px", height: "auto" }}
            />
          </a>

          <nav id="navbar" className={`${style.navbar} order-last order-lg-0`}>
            <ul>
              <li>
                <a className={`${style.navlink}`} href="/">
                  Home
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/assignment">
                  Assignments
                </a>
              </li>

              <li className={style.dropdown}>
                <a>
                  <span>Tools</span> <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="/codeai" target="_blank" rel="noopener noreferrer">
                      Code AI
                    </a>
                  </li>
                  <li className={style.dropdown}>
                    <a href="/calendar">Calendar</a>
                  </li>
                  <li>
                    <a href="/calculator">Calculator</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/course">
                  Course
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/contact">
                  Contact
                </a>
              </li>

              <li className={style.dropdown}>
                <a href="">
                  <span>Account Settings</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>{userData.fname}</li>
                  <li></li>

                  <li>
                    <a onClick={logOut}>Log Out</a>
                  </li>
                </ul>
              </li>
              <li></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className={style.hero}></section>
      <main id="main">
        <section id="featured-services" className={style.featuredservices}>
          <div className="container">
            <div className="row gy-4">
              <div className="col-xl-3 col-md-6 d-flex">
                <div className={`${style.serviceItem} position-relative`}>
                  <div className={style.icon}>
                    <i className="bi bi-activity icon"></i>
                  </div>
                  <h4>
                    <a className="stretched-link">Faculty: {userData.fname}</a>
                  </h4>

                  {/* <button className="btn btn-primary" onClick={downloadPDF}>
                    Download PDF
                  </button> */}
                </div>
              </div>

              <div className="col-xl-3 col-md-6 d-flex">
                <div className={`${style.serviceItem} position-relative`}>
                  <div className={style.icon}>
                    <i className="bi bi-broadcast icon"></i>
                  </div>
                  <h4>
                    <a className="stretched-link">
                      No. Of Assignments: {allAssignments}
                    </a>
                  </h4>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 d-flex">
                <div className={`${style.serviceItem} position-relative`}>
                  <div className={style.icon}>
                    <i className="bi bi-easel icon"></i>
                  </div>
                  <h4>
                    <a className="stretched-link">
                      Assignments Completed: {completedAssignments}
                    </a>
                  </h4>
                </div>
              </div>

              {/* <div className="col-xl-3 col-md-6 d-flex">
                <div className={`${style.serviceItem} position-relative`}>
                  <div className={style.icon}>
                    <i className="bi bi-bounding-box-circles icon"></i>
                  </div>
                  <h4>
                    <a className="stretched-link">
                      Assignments Not Completed: {notCompletedAssignments}
                    </a>
                  </h4>
                </div>
              </div> */}

              <div className="row">
                <div className="col">
                  {/* <label htmlFor="searchBatch">Search Batch:</label> */}
                  <input
                    type="text"
                    id="searchBatch"
                    className="form-control"
                    value={searchBatch}
                    onChange={(e) => setSearchBatch(e.target.value)}
                    placeholder="Search Batch"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  disabled={filteredCodeData.length === 0}
                  onClick={downloadPDFAndExcel}
                >
                  Download PDF & Excel
                </button>
              </div>

              <div className="row">
                {filteredCodeData.map((i) => {
                  const number = calculateNumber(
                    i.testCasesStatus1,
                    i.testCasesStatus2,
                    i.testCasesStatus3
                  );

                  return (
                    <div className="col-md-4" key={i._id}>
                      <div className={`${main.card} shadow-sm`}>
                        <div className={main.cardbody}>
                          <p>
                            <strong>Date:</strong> {formatDate(i.createdAt)}
                          </p>
                          <p>
                            <strong>Email:</strong> {i.userMail}
                          </p>
                          <p>
                            <strong>Test Case 1 Status:</strong>{" "}
                            {i.testCasesStatus1}
                          </p>
                          <p>
                            <strong>Test Case 2 Status:</strong>{" "}
                            {i.testCasesStatus2}
                          </p>
                          <p>
                            <strong>Test Case 3 Status:</strong>{" "}
                            {i.testCasesStatus3}
                          </p>
                          <p>
                            <strong>Score:</strong> {number}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentProgress;
