import React, { useState, useEffect } from "react";
import style2 from "./CoursesDetails.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import style from "./Navbar.module.css";
import main from "./Main.module.css";
import Popup from "reactjs-popup";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const [userData, setUserData] = useState("");
  const [courseDetails, setCourseDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [AssignmentData, setAssignmentData] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/courseDetails/${id}`, {
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
        console.log(data, "CourseData");

        setCourseDetails(data.data);
        if (data.data == "token expired") {
          window.localStorage.clear();
          window.location.replace("/");
        }
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/assignmentDetailsFromCourse", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        courseid: id,
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
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
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
          {/* <div
            className={`${style.leftItem} align-items-center d-none d-md-flex`}
          >
            <i className="bi bi-clock"> </i>Monday - Saturday, 8AM to 10PM
          </div> */}
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
                    <a href="/codeai">Code AI</a>
                  </li>
                  <li className={style.dropdown}>
                    <a href="/calendar">Calendar</a>
                    {/* <ul>
                      <li>
                        <a href="/diseasePrediction">Disease Predictor</a>
                      </li>
                      <li>
                        <a href="/medicinePrediction">Medicine Predictor</a>
                      </li>
                      <li>
                        <a href="/calorieTracker">
                          MedicoMate's Calorie Tracker
                        </a>
                      </li>
                      <li>
                        <a href="/exercise">Custom Fitness Plans</a>
                      </li>
                      <li>
                        <a href="/diet">Customized Nutrition</a>
                      </li>
                     
                    </ul> */}
                  </li>
                  <li>
                    <a href="/calculator">Calculator</a>
                  </li>
                  {/* <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li> */}
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
              {/* <li>
                <a className={`${style.navlink}`} href="#footer">
                  About
                </a>
              </li> */}
              <li className={style.dropdown}>
                <a href="">
                  <span>Account Settings</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>{userData.fname}</li>
                  <li>
                    {/* <a href={`/patientAppointment/${userData._id}`}>
                      See Appointment
                    </a> */}
                  </li>

                  <li>
                    <a onClick={logOut}>Log Out</a>
                  </li>
                  {/* <li>
                    <a href="#">Drop Down 3</a>
                  </li> */}
                </ul>
              </li>
              <li>
                {/* <Popup
                  trigger={
                    <a className={`${style.logo} me-auto`}>
                      <img
                        className="img-fluid rounded-circle shadow-sm"
                        src="/chatbot.png"
                        alt=""
                        style={{ width: "50px", height: "auto" }}
                      />
                    </a>
                  }
                  position="bottom middle"
                  contentStyle={{
                    width: "400px",
                    padding: "20px",
                    height: "600px",
                    overflowY: "auto",
                  }}
                  // closeOnDocumentClick={false}
                >
                  <div>
                    <h1>
                      <strong>ChatBot</strong>
                    </h1>
                    <strong>
                      <label for="inputEmail4">Ask your query</label>
                    </strong>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="felling"
                      placeholder="Ask Your Query!"
                      value={""}
                      onChange={""}
                      required
                    />
                    <button
                      style={{ marginTop: "20px" }}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Secondary
                    </button>
                    <strong>
                      <label for="inputEmail4" style={{ marginTop: "30px" }}>
                        Response
                      </label>
                    </strong>
                    <textarea
                      value={"hf"}
                      onChange={""}
                      style={{
                        width: "100%",
                        height: "300px",
                        resize: "none",
                        marginTop: "10px",
                      }}
                      disabled
                    />
                  </div>
                </Popup> */}
              </li>
            </ul>
          </nav>
          {/* <Popup
            trigger={
              <a className={`${style.appointmentbtn} ${main.pointerLink}`}>
                <span className="d-none d-md-inline">Apply</span> Filter
              </a>
            }
            // position="middle"
            contentStyle={{
              width: "20%",
              padding: "10px",
              height: "40%",
            }}
            // closeOnDocumentClick={false}
          >
            <Calendar
              onChange={handleDateChange} // Handle date change
              value={selectedDate} // Set selected date
              tileContent={tileContent}
            />
          </Popup> */}
          <Popup
            trigger={
              <a className={`${style.appointmentbtn} ${main.pointerLink}`}>
                <span className="d-none d-md-inline">Apply</span> Filter
              </a>
            }
            contentStyle={{
              width: "60%", // Adjust width for mobile
              padding: "10px",
              height: "auto", // Use auto to fit content
              maxHeight: "90%", // Ensure it doesn't exceed the screen height
              overflowY: "auto", // Add scroll if content overflows
              boxSizing: "border-box",
              position: "relative", // To position the close button
            }}
            modal // Use modal to cover the screen and make it more mobile-friendly
          >
            {(close) => (
              <div>
                <button
                  onClick={close}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
                <Calendar
                // Example content, replace with your actual tile content
                />
              </div>
            )}
          </Popup>
        </div>
      </header>
      <section
        id="hero"
        className={`${style2.hero1} d-flex align-items-center`}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
            >
              <div>
                <h1>Syllabus</h1>
                <h2>{courseDetails.Syllabus}</h2>
              </div>
            </div>
            <div
              className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
              data-aos="fade-up"
            >
              <img src="/hero-img.png" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section id="details" className={style2.details}>
        <section id="featured-services" className={style.featuredservices}>
          <div className={style.container} data-aos="fade-up">
            <div className="row">
              {AssignmentData.map((i) => {
                return (
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div
                      className={style.iconbox}
                      data-aos="fade-up"
                      data-aos-delay="100"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className={style.icon}>
                        <i className="fas fa-tasks"></i>
                      </div>
                      <h4 className={style.title}>
                        <a
                          href={`/assignment/assignmentDetails/${i._id}`}
                          className={main.pointerLink}
                          type="button"
                        >
                          Click here for Full Assignment Details
                        </a>
                      </h4>
                      <p className={style.description}>
                        {i.BriefAssignmentContent}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </section>
      <div id="main">
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
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/">Home</a>
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
                      <a href="/codeai">Code AI</a>
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
    </div>
  );
};

export default CourseDetails;
