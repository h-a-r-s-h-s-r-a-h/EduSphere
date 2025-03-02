import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import style from "./Navbar.module.css";
import main from "./Main.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const StudentSection = () => {
  const [userData, setUserData] = useState("");

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

          <a href="/simpleCompiler" className={`${style.appointmentbtn}`}>
            <span className="d-none d-md-inline">Compile</span> Code
          </a>
        </div>
      </header>
      <section id="hero" className={main.hero}>
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
              <h2>
                Welcome to <span>Student Section</span>
              </h2>
              <p>
                Unlock your coding potential with our app, offering a seamless,
                integrated environment for writing, testing, and deploying your
                code with ease.
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <a href="/tools" className={`${main.btngetstarted}`}>
                  Get Started
                </a>
                {/* <a
                  href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  className={`glightbox ${main.btnwatchvideo} d-flex align-items-center`}
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a> */}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <img
                src="./hero-img.svg"
                className="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="100"
              />
            </div>
          </div>
        </div>

        <div className={`${main.iconboxes} position-relative`}>
          <div className="container position-relative">
            <div className="row gy-4 mt-5">
              {/* <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className={main.iconbox}>
                  <div className={main.icon}>
                    <img className={main.innerImage} alt="" src="/course.png" />
                    
                  </div>
                  <h4 className={main.title}>
                    <a href="/adminCourse" className="stretched-link">
                      Courses
                    </a>
                  </h4>
                </div>
              </div> */}

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className={main.iconbox}>
                  <div className={main.icon}>
                    <img className={main.innerImage} alt="" src="/interview.png" />
                  </div>
                  <h4 className={main.title}>
                    <a href="/codemeet" className="stretched-link">
                      Code Meet
                    </a>
                  </h4>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className={main.iconbox}>
                  <div className={main.icon}>
                    <img
                      className={main.innerImage}
                      alt=""
                      src="/report.png"
                    />
                    {/* <i class="bi bi-geo-alt"></i> */}
                  </div>
                  <h4 className={main.title}>
                    <a href="/studentReport" className="stretched-link">
                      Student Progress
                    </a>
                  </h4>
                </div>
              </div>

              <div
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className={main.iconbox}>
                  <div className={main.icon}>
                    <img
                      className={main.innerImage}
                      alt=""
                      src="/team.png"
                    />
                    {/* <i className="bi bi-command"></i> */}
                  </div>
                  <h4 className={main.title}>
                    <a href="/group" class="stretched-link">
                      Student User Group
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={style.contact}>
        <div className={style.container}>
          <div className="section-title">
            <h2>Contact</h2>
          </div>
        </div>

        <div className={style.container}>
          <div className="row mt-5">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12">
                  <div className={style.infobox}>
                    <img src="/map.png" style={{ width: "100px" }}></img>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.google.com/maps/dir//Plot+Nos+8,+Bennett+University+(Times+of+India+Group),+11,+TechZone+2,+Greater+Noida,+Uttar+Pradesh+201310/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390cbf94deb6bc39:0x7ba6bedc9a2b537f?sa=X&ved=1t:57443&ictx=111"
                    >
                      <h3>Our Address</h3>
                    </a>
                    <p>
                      Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh
                      201310
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box mt-4">
                    <i className="bx bx-envelope"></i>
                    <h3>Email Us</h3>
                    <p>
                      harshvirat894@gmail.com
                      <br />
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box mt-4">
                    <i className="bx bx-phone-call"></i>
                    <h3>Call Us</h3>
                    <p>
                      +91 6203104630
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <form className={style.phpemailform}>
                <div className="row">
                  <div className={`col-md-6 ${style.formgroup}`}>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      id="name"
                      placeholder="Your Name"
                      required=""
                    />
                  </div>
                  <div className={`col-md-6 ${style.formgroup} mt-3 mt-md-0`}>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      required=""
                    />
                  </div>
                </div>
                <div className={`${style.formgroup} mt-3`}>
                  <input
                    type="text"
                    class="form-control"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    required=""
                  />
                </div>
                <div className={`${style.formgroup} mt-3`}>
                  <textarea
                    class="form-control"
                    name="message"
                    rows="7"
                    placeholder="Message"
                    required=""
                  ></textarea>
                </div>
                <div className="my-3">
                  <div className={style.loading}>Loading</div>
                  <div className={style.errormessage}></div>
                  <div className={style.sentmessage}>
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
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
  );
};

export default StudentSection;
