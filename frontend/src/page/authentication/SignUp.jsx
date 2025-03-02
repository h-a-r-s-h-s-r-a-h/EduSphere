import React, { useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "material-design-icons/iconfont/material-icons.css";
import style from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [fname, setfname] = useState(``);
  const [lname, setlname] = useState(``);
  const [email, setemail] = useState(``);
  const [password, setpassword] = useState(``);
  const [mobile, setmobile] = useState(``);
  const [userType, setuserType] = useState(``);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5000/register", {
      method: "Post",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        mobile: mobile,
        userGroup: "0",
        userType: "Student",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          window.location.href = "./login";
        } else {
          toast.error("User Already Registered");
        }
      });
  };
  return (
    <div className={style.main}>
      <header
        id="header"
        className={`fixed-top  ${style.headertransparent} ${style.header1}`}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className={style.logo}>
            <h1>
              <a>APP_NAME</a>
            </h1>

            <a href="index.html">
              <img src="assets/img/logo.png" alt="" className="img-fluid" />
            </a>
          </div>

          <nav id="navbar" className={style.navbar}>
            <ul>
              <li>
                <a className={`nav-link scrollto ${style.active}`} href="/"></a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className={`${style.getstarted} scrollto`} href="/login">
                  Log In
                </a>
              </li>
            </ul>
            {/* <i className="bi bi-list mobile-nav-toggle"></i> */}
          </nav>
        </div>
      </header>
      <section className="sign-in">
        <div className={style.container}>
          <div className={style.signincontent}>
            <div className={style.signinimage}>
              <figure>
                <img src="/log-in.png" alt="sing up image" />
              </figure>
            </div>

            <div className={style.signinform}>
              <h2 className={style.formtitle}>Sign Up</h2>
              <form
                onSubmit={handleSubmit}
                className={style.registerform}
                id="login-form"
              >
                <div className={style.formgroup}>
                  <label for="your_name">
                    <FontAwesomeIcon
                      icon={faUser}
                      className={style.materialiconsname}
                    />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="First Name"
                    onChange={(event) => {
                      setfname(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className={style.formgroup}>
                  <label for="your_name">
                    <FontAwesomeIcon
                      icon={faUser}
                      className={style.materialiconsname}
                    />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Last Name"
                    onChange={(event) => {
                      setlname(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className={style.formgroup}>
                  <label for="your_name">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={style.materialiconsname}
                    />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Email"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className={style.formgroup}>
                  <label for="your_name">
                    <FontAwesomeIcon
                      icon={faPhone}
                      // className={style.materialiconsname}
                    />
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Phone"
                    onChange={(event) => {
                      setmobile(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className={style.formgroup}>
                  <label for="your_pass">
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className={style.formgroup}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className={style.agreeterm}
                  />
                </div>
                <div
                  className={`${style.formgroup} ${style.formbutton} form-group form-button`}
                >
                  <button type="login" className="btn btn-outline-primary">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
