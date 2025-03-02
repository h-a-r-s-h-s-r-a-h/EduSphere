import React, { useState, useEffect } from "react";
import GLightbox from "glightbox";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Swiper from "swiper";
import style from "./TestHome.module.css";
import style1 from "./Auth.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import dragStyle from "./Drag.module.css";

const MainHome = ({ userData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData1, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [setquery, query] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const carousel = document.querySelector(`.${dragStyle.carousel}`);
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const wrapper = document.querySelector(`.${dragStyle.wrapper}`);

    if (!carousel || !wrapper || !leftBtn || !rightBtn) return;

    const firstCard = carousel.querySelector(`.${dragStyle.card}`);
    if (!firstCard) return;
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
      startX,
      startScrollLeft;

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX - carousel.offsetLeft;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = x - startX;
      carousel.scrollLeft = startScrollLeft - walk;
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const scrollLeft = () => {
      carousel.scrollLeft -= firstCardWidth;
    };

    const scrollRight = () => {
      carousel.scrollLeft += firstCardWidth;
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    leftBtn.addEventListener("click", scrollLeft);
    rightBtn.addEventListener("click", scrollRight);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      leftBtn.removeEventListener("click", scrollLeft);
      rightBtn.removeEventListener("click", scrollRight);
    };
  }, []);
  useEffect(() => {
    // Automatically switch to next slide every 3 seconds
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 3000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1) % slides.length);
  };

  const slides = [
    {
      backgroundImage: "url(/slide1.jpg)",
      title: "Start Learning",
      content:
        "Challenge your mind and unlock your potential by tackling these thought-provoking problems – dive in and discover the power of problem-solving!",
    },
    {
      backgroundImage: "url(/slide2.jpg)",
      title: "Start Learning",
      content:
        "Challenge your mind and unlock your potential by tackling these thought-provoking problems – dive in and discover the power of problem-solving!",
    },
    {
      backgroundImage: "url(/slide3.jpg)",
      title: "Start Learning",
      content:
        "Challenge your mind and unlock your potential by tackling these thought-provoking problems – dive in and discover the power of problem-solving!",
    },
  ];
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
    });
  }, []);

  return (
    <div>
      <header
        id="header"
        className={`fixed-top  ${style1.headertransparent} ${style1.header1}`}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className={style1.logo}>
            <h1>
              <a>APP_NAME</a>
            </h1>

            <a href="index.html">
              <img src="assets/img/logo.png" alt="" className="img-fluid" />
            </a>
          </div>

          <nav id="navbar" className={style1.navbar}>
            <ul>
              <li>
                <a
                  className={`nav-link scrollto ${style1.active}`}
                  href="/"
                ></a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className={`${style1.getstarted} scrollto`} href="/login">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className={style.hero}>
        <div className={`${style.carousel} slide carousel-fade`}>
          <div className={style.carouselinner} role="listbox">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${style.carouselitem} ${
                  index === currentSlide ? style.active : ""
                }`}
                style={{ backgroundImage: slide.backgroundImage }}
              >
                <div className={style.container}>
                  <h2>{slide.title}</h2>
                  <p>{slide.content}</p>
                  <a href="/services" className={`${style.btngetstarted}`}>
                    Try NOW!
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Next Control */}
          {/* <button
            className={`${style.carouselcontrolnext} carousel-control-next`}
            type="button"
            onClick={goToNextSlide}
          >
            <span
              className={`${style.carouselcontrolnexticon} bi bi-chevron-right`}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button> */}
        </div>
      </section>
      <main id="main">
        <section id="services" className={`${style.services} services`}>
          <div className={style.container} data-aos="fade-up">
            <div className={style.sectiontitle}>
              <h2>Services</h2>
              <p>
                Elevate your learning with our comprehensive services: master
                assignments, enhance skills with diverse courses, and utilize
                powerful tools like our compiler, CodeAI, and Coding Room –
                everything you need to succeed in one place!
              </p>
            </div>

            <div className="row">
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className={style.icon}>
                  <i className="fas fa-file-alt"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/diseasePrediction">Assignment</a>
                </h4>
                <p className={style.description}>
                  Conquer your coursework with our expertly crafted assignments
                  designed to enhance your understanding and boost your academic
                  performance!
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className={style.icon}>
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/medicomart">Course</a>
                </h4>
                <p className={style.description}>
                  Explore our diverse range of courses designed to expand your
                  knowledge, sharpen your skills, and accelerate your journey
                  towards mastery!
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className={style.icon}>
                  <i className="fas fa-code"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/doctor">Compiler</a>
                </h4>
                <p className={style.description}>
                  Compile and run your code effortlessly with our powerful,
                  user-friendly compiler designed to support your programming
                  projects from start to finish!
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className={style.icon}>
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/diet">Coding Room </a>
                </h4>
                <p className={style.description}>
                  Step into our coding room – your virtual space for
                  collaborative coding, brainstorming ideas, and transforming
                  concepts into reality with ease and efficiency!
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className={style.icon}>
                  <i className="fas fa-brain"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/exercise">Code AI</a>
                </h4>
                <p className={style.description}>
                  Empower your coding journey with CodeAI – harness the
                  intelligence of AI to streamline your development process,
                  refine your coding skills, and unlock new possibilities in
                  software creation!
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className={style.icon}>
                  <i className="fas fa-life-ring"></i>
                </div>
                <h4 className={style.title}>
                  <a href="/calorieTracker">Help And Support</a>
                </h4>
                <p className={style.description}>
                  Your success is our priority. Reach out to our dedicated
                  support team for prompt assistance, guidance, and solutions
                  tailored to your needs – we're here to help every step of the
                  way!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Courses</h2>
          <p style={{ fontSize: "20px" }}>Python Basics</p>
          <div className={dragStyle.body1}>
            <div className={dragStyle.wrapper}>
              <i id="left" className="fa-solid fas fa-angle-left"></i>
              <ul className={dragStyle.carousel}>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img
                      src="/python.png" // Change this URL to the new assignment image
                      alt="Assignment"
                      draggable="false"
                    />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Basic Syntax
                  </h2>
                  <a href={`/freeCourses/${123}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/python.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Variables And DataTypes
                  </h2>
                  <a href={`/freeCourses/${1234}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/python.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Conditionals
                  </h2>
                  <a href={`/freeCourses/${12345}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                {/* <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/python.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Type Casting
                  </h2>
                  <a href="/login">
                    <span>Starting Learning</span>
                  </a>
                </li> */}
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/python.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>Arrays</h2>
                  <a href={`/freeCourses/${123456}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                {/* <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/python.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Lambdas
                  </h2>
                  <a href="/login">
                    <span>Starting Learning</span>
                  </a>
                </li> */}
                {/* Repeat the card elements as needed */}
              </ul>
              <i id="right" className="fa-solid fas fa-angle-right"></i>
            </div>
          </div>

          {/* end of python basics card  */}

          {/* Start of DSA card */}
          <p style={{ fontSize: "20px", marginTop: "50px" }}>
            Data Structures & Algorithms
          </p>
          <div className={dragStyle.body1}>
            <div className={dragStyle.wrapper}>
              <i id="left" className="fa-solid fas fa-angle-left"></i>
              <ul className={dragStyle.carousel}>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img
                      src="/structure.png" // Change this URL to the new assignment image
                      alt="Assignment"
                      draggable="false"
                    />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>Array</h2>
                  <a href={`/freeCourses/${123456}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/structure.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Linked Lists
                  </h2>
                  <a href={`/freeCourses/${123}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/structure.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>Stacks</h2>
                  <a href={`/freeCourses/${1234}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/structure.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>Queues</h2>
                  <a href={`/freeCourses/${12345}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/structure.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Hash Tables
                  </h2>
                  <a href={`/freeCourses/${123456}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                <li className={dragStyle.card}>
                  <div className={dragStyle.img}>
                    <img src="/structure.png" alt="" draggable="false" />
                  </div>
                  <h2 style={{ color: "green", fontWeight: "bold" }}>
                    Complexity
                  </h2>
                  <a href={`/freeCourses/${123}`}>
                    <span>Starting Learning</span>
                  </a>
                </li>
                {/* Repeat the card elements as needed */}
              </ul>
              <i id="right" className="fa-solid fas fa-angle-right"></i>
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
                      {/* <img src="/map.png" style={{ width: "100px" }}></img> */}
                      <i className="fas fa-map"></i>
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
          <div className={`${style.container} d-md-flex py-4`}>
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>App_NAME</span>
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
      </main>
    </div>
  );
};

export default MainHome;
