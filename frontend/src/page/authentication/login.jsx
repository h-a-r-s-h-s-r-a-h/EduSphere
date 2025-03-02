import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "material-design-icons/iconfont/material-icons.css";
import style from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState(``);
  const [password, setpassword] = useState(``);
  const showToast = (e) => {
    toast("Invalid Email or Password");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "Post",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("okkh");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./userDetails";
        } else {
          alert("Invalid Email Or Password!");
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
                <a className={`${style.getstarted} scrollto`} href="/sign-up">
                  Sign Up
                </a>
              </li>
            </ul>
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
              {/* <a href="#" className={style.signupimagelink}>
                Create an account
              </a> */}
            </div>

            <div className={style.signinform}>
              <h2 className={style.formtitle}>Log In</h2>
              <form
                className={style.registerform}
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className={style.formgroup}>
                  <label for="your_name">
                    {/* <i
                      className={`zmdi zmdi-account ${style.materialiconsname}`}
                    ></i> */}
                    <FontAwesomeIcon
                      icon={faUser}
                      className={style.materialiconsname}
                    />
                  </label>
                  <input
                    type="email"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Email"
                    onChange={(event) => {
                      setemail(event.target.value);
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
                  <label for="remember-me" className={style.labelagreeterm}>
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>
                <div
                  className={`${style.formgroup} ${style.formbutton} form-group form-button`}
                >
                  <button type="login" className="btn btn-outline-primary">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
