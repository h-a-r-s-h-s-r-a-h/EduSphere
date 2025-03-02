import React, { Component, useEffect, useState } from "react";
import AdminHome from "../Student/Home/AdminHome";
import MainHome from "../Student/Home/StudentHome";
import MainAdminHome from "../Admin/Home/MainAdminHome";
export default function UserDetail() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

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

  // return admin ? <AdminHome /> : <UserHome userData={userData} />;
  return admin ? (
    <MainAdminHome userData={userData} />
  ) : (
    <MainHome userData={userData} />
  );
}
