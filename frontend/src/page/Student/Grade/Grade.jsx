import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import style from "./Navbar.module.css";
import main from "./Main.module.css";
import Popup from "reactjs-popup";
import Calendar from "react-calendar";
import "reactjs-popup/dist/index.css";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Grade = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [AssignmentData, setAssignmentData] = useState([]);
  const [codeData, setcodeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
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
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          // alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:5000/getAllSubmittedCode", {
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
        setcodeData(data.data);
      });
  }, []);
  
  let completedAssignments = 0;
  let notCompletedAssignments = 0;
  
  try {
    // Check if codeData is an array before iterating over it
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
          // alert("Token expired login again");
          window.localStorage.clear();
          // window.location.href = "./sign-in";
          window.location.replace("/");
        }
      });
  }, []);
  
  let allAssignments = 0;
  try {
    // Check if codeData is an array before iterating over it
    if (Array.isArray(AssignmentData)) {
      AssignmentData.forEach((assignment) => {
        allAssignments++;
      });
    } else {
      throw new Error("codeData is not an array");
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
          {Array.isArray(codeData) && codeData.length > 0 ? (
            codeData.map((i) => {
              const number = calculateNumber(i.testCasesStatus1, i.testCasesStatus2, i.testCasesStatus3);
              return (
                <div className="list-group" key={i.email}>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{formatDate(i.createdAt)}</h5>
                      <small className="text-muted">{i.userMail}</small>
                    </div>
                    <p className="mb-1">Test Cases.1 Status {i.testCasesStatus1}</p>
                    <p className="mb-1">Test Cases.2 Status {i.testCasesStatus2}</p>
                    <p className="mb-1">Test Cases.3 Status {i.testCasesStatus3}</p>
                    <small className="text-muted">Marks: {number}</small>
                  </a>
                </div>
              );
            })
          ) : (
            <p>No Student is Registered</p>
          )}
        </section>
      </main>
      <footer id="footer" className={style.footer}>
        <div className={style.footertop}>
          <div className={style.container}>
            <div className="row">
              <div className={`col-lg-3 col-md-6 ${style.footercontact}`}>
                <h3>APP_NAME</h3>
                <p>Bennett University</p>
                <p>Greater Noida , 201310</p>
                <p>India</p>
                <p>
                  <strong>Phone:</strong>
                </p>{" "}
                6203104630
                <p>
                  <strong>Email:</strong>
                </p>{" "}
                harshvirat894@gmail.com
                <br />
                <br />
              </div>

              <div className={`col-lg-2 col-md-6 ${style.footerlinks}`}>
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i> <a href="/">Home</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/assignment">Assignments</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/course">Courses</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/tools">Tools</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/">Help and Support</a>
                  </li>
                </ul>
              </div>

              <div className={`col-lg-3 col-md-6 ${style.footerlinks}`}>
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/simpleCompiler">Compiler</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/calculator">Calculator</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/calendar">Calendar</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/codeai" target="_blank" rel="noopener noreferrer">
                      Code AI
                    </a>
                  </li>
                  {/* <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/diet">Diet Recommendation</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/exercise">Exercise Recommendation</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/calorieTracker">Calorie Tracker</a>
                  </li> */}
                </ul>
              </div>

              <div className={`col-lg-4 col-md-6 ${style.footernewsletter}`}>
                <img src="/coder.png" alt="doctor" />
              </div>
            </div>
          </div>
        </div>

        <div className={`${style.container} d-md-flex py-4`}>
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>APP_NAME</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className={style.credits}>
              Designed by{" "}
              <a href="https://github.com/h-a-r-s-h-s-r-a-h">Harsh</a>
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="#" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a>
            <a href="#" class="facebook">
              <i class="bx bxl-facebook"></i>
            </a>
            <a href="#" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="#" class="google-plus">
              <i class="bx bxl-skype"></i>
            </a>
            <a href="#" class="linkedin">
              <i class="bx bxl-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Grade;
