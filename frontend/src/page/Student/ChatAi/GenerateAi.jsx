import React, { useState, useEffect, useRef } from "react";
import "./chat.css";

const GenerateAi = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [consoleOutput, setConsoleOutput] = useState(["Happy Coding!"]);
  const consoleRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const formattedInput = `> ${inputValue}`;
      setConsoleOutput((prevOutput) => [...prevOutput, formattedInput]);
      setInputValue("");
      handleSubmit(formattedInput);
    }
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const handleSubmit = async (formattedInput) => {
    const response = await fetch("http://127.0.0.1:8001/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: formattedInput }),
    });
    const data = await response.json();
    setConsoleOutput((prevOutput) => [...prevOutput, data.message]);
  };
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

  return (
    <div className="body">
      <div className="console-container">
        <textarea
          className="console-output"
          value={consoleOutput.join("\n")}
          readOnly
          ref={consoleRef}
          style={{
            color: "white",
            resize: "none",
            height: "80%",
            width: "100%",
          }}
        />
        <textarea
          type="text"
          className="console-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          autoFocus
          placeholder="Type your message..."
          style={{
            resize: "none",
          }}
        />
      </div>
    </div>
  );
};

export default GenerateAi;
