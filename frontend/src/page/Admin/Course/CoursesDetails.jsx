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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hoverStyle from "./CreateCourse.module.css";

const AdminCourseDetails = () => {
  const [userData, setUserData] = useState("");
  const [courseDetails, setCourseDetails] = useState([]);
  const { id } = useParams();
  const [taskData, setTaskData] = useState(``);
  const navigate = useNavigate();
  const [AssignmentData, setAssignmentData] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [newAssignmentData, setnewAssignmentData] = useState(``);
  const [hintdata, setHintData] = useState(``);
  const [testcase1, setTestCases1] = useState(``);
  const [testcase2, setTestCases2] = useState(``);
  const [testcase3, setTestCases3] = useState(``);
  const [expectedOutput1, setExpectedOutput1] = useState(``);
  const [expectedOutput2, setExpectedOutput2] = useState(``);
  const [expectedOutput3, setExpectedOutput3] = useState(``);
  const [teacherName, setTeacherName] = useState(``);
  const [teacherId, setteacherId] = useState(``);
  const [teacherType, setTeacherType] = useState(``);
  const [testCasesMarks, setTestcasesMarks] = useState(``);
  const [dueDate, setdueDate] = useState(``);
  const [userGroup, setUserGroup] = useState(``);
  const [collegeId, setCollegeId] = useState(``);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [codeData, setcodeData] = useState([]);

  const handleClick = () => {
    navigate(`/studentProgress/${courseDetails._id}`);
  };

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
        if (data.data == "token expired") {
          // alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);
  const saveAssignment = () => {
    fetch("http://localhost:5000/registerAssignmentFromCourse", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        courseid: id,
        Collegeid: collegeId,
        Teacherid: userData._id,
        AssignmentContent: newAssignmentData,
        TestCases: {
          testCases1: testcase1,
          testCases2: testcase2,
          testCases3: testcase3,
        },
        ExpectedOutput: {
          expectedOutput1: expectedOutput1,
          expectedOutput2: expectedOutput2,
          expectedOutput3: expectedOutput3,
        },
        hintAboutQuestion: hintdata,
        timeLimit: dueDate,
        TestCaseMarkDistribution: testCasesMarks,
        userGroup: userGroup,
        BriefAssignmentContent: taskData,
        TeacherName: userData.fname,
        TeacherType: "Proffesor",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          toast("Your Assigment is successfully submitted.");
          setTimeout(() => {
            window.location.replace("/admincourse");
          }, 1000);
        }
      });
  };

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
                <a className={`${style.navlink}`} href="/adminAssignment">
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
                <a className={`${style.navlink}`} href="/adminCourse">
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
                <button
                  className="btn-get-started btn btn-primary"
                  style={{ marginBottom: "10px" }}
                  onClick={handleClick}
                >
                  See Result
                </button>
                <br />
                <Popup
                  trigger={
                    <button className="btn-get-started btn btn-primary">
                      Add Assignment
                    </button>
                  }
                  contentStyle={{
                    width: "65%",
                    padding: "20px",
                    height: "800px",
                    overflowY: "auto",
                  }}
                  closeOnDocumentClick={false}
                  modal
                  overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  {(close) => (
                    <div style={{ position: "relative", textAlign: "center" }}>
                      <button
                        className="close"
                        onClick={close}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        &times;
                      </button>

                      <h1 className={hoverStyle.mainhead}>Create Assignment</h1>
                      <p></p>

                      <button
                        className={`${hoverStyle.gptButton} btn btn-primary`}
                      >
                        {" "}
                        Generate with gpt
                      </button>

                      <section classname={hoverStyle.description}>
                        <h2>Task Name</h2>
                        <input
                          type="text"
                          placeholder="Task Name"
                          onChange={(event) => {
                            setTaskData(event.target.value);
                          }}
                        />
                        <h2>Description</h2>
                        <textarea
                          rows="10"
                          style={{ resize: "none" }}
                          placeholder="Full Description of Assignment"
                          onChange={(event) => {
                            setnewAssignmentData(event.target.value);
                          }}
                        ></textarea>
                      </section>

                      <section classname={hoverStyle.groups}>
                        <h2>Hint About Assignment</h2>
                        <textarea
                          rows="10"
                          style={{ resize: "none" }}
                          placeholder="Hint"
                          onChange={(event) => {
                            setHintData(event.target.value);
                          }}
                        ></textarea>
                        <hr className={hoverStyle.hrstyle} />
                        <h2>Test Cases 1.</h2>
                        <textarea
                          style={{ resize: "none" }}
                          type="text"
                          placeholder="Test case 1"
                          onChange={(event) => {
                            setTestCases1(event.target.value);
                          }}
                        />
                        <h2>Expected Output</h2>

                        <input
                          type="text"
                          placeholder="Expected Output"
                          onChange={(event) => {
                            setExpectedOutput1(event.target.value);
                          }}
                        />
                        <hr className={hoverStyle.hrstyle} />
                        <h2>Test Cases 2.</h2>
                        <textarea
                          style={{ resize: "none" }}
                          type="text"
                          placeholder="Test case 2"
                          onChange={(event) => {
                            setTestCases2(event.target.value);
                          }}
                        />
                        <h2>Expected Output</h2>

                        <input
                          type="text"
                          placeholder="Expected Output"
                          onChange={(event) => {
                            setExpectedOutput2(event.target.value);
                          }}
                        />
                        <hr className={hoverStyle.hrstyle} />
                        <h2>Test Cases 3.</h2>
                        <textarea
                          type="text"
                          style={{ resize: "none" }}
                          placeholder="Test case 3"
                          onChange={(event) => {
                            setTestCases3(event.target.value);
                          }}
                        />
                        <h2>Expected Output</h2>

                        <input
                          type="text"
                          placeholder="Expected Output"
                          onChange={(event) => {
                            setExpectedOutput3(event.target.value);
                          }}
                        />
                        <hr className={hoverStyle.hrstyle} />
                        <table>
                          <td>
                            <h2>Teacher Name</h2>
                            <input
                              type="text"
                              defaultValue={userData.fname}
                              disabled
                              onChange={(event) => {
                                setTeacherName(event.target.defaultValue);
                              }}
                            />
                          </td>
                          <td>
                            <h2>Teacher id</h2>
                            <input
                              type="text"
                              defaultValue={userData._id}
                              disabled
                              onChange={(event) => {
                                setteacherId(event.target.defaultValue);
                              }}
                            />
                          </td>
                          <td>
                            <h2>Teacher Type</h2>
                            <input
                              type="text"
                              defaultValue={"Proffesor"}
                              disabled
                              onChange={(event) => {
                                setTeacherType(event.target.defaultValue);
                              }}
                            />
                          </td>
                        </table>
                        <hr className={hoverStyle.hrstyle} />
                        <h1>Test Cases Marks Distribution</h1>
                        <input
                          type="text"
                          placeholder="Marks"
                          onChange={(event) => {
                            setTestcasesMarks(event.target.value);
                          }}
                        />
                      </section>

                      <section classname={hoverStyle.duedate}>
                        <h2>Select Due Date</h2>
                        <input
                          type="date"
                          onChange={(event) => {
                            setdueDate(event.target.value);
                          }}
                        />
                      </section>

                      <section classname={hoverStyle.assignmentsettings}>
                        <table>
                          <td>
                            <h2>User group</h2>
                            <input
                              type="text"
                              placeholder="Enter User Group"
                              onChange={(event) => {
                                setUserGroup(event.target.value);
                              }}
                            />
                          </td>
                          <td>
                            <h2>College Id</h2>
                            <input
                              type="text"
                              placeholder="Enter CollegeId"
                              onChange={(event) => {
                                setCollegeId(event.target.value);
                              }}
                            />
                          </td>
                        </table>
                        <button
                          className="btn-get-started"
                          onClick={saveAssignment}
                        >
                          Create
                        </button>
                      </section>

                      <div classname={hoverStyle.buttons}></div>
                    </div>
                  )}
                </Popup>
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
                      <a href="/adminAssignment">Assignments</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/adminCourse">Courses</a>
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

export default AdminCourseDetails;
