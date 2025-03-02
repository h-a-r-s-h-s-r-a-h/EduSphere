import React, { useState } from "react";
import Select from "react-select";
import "./Navbar.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "./Navbar.module.css";

const Navbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8001/code_1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputValue }),
    });
    const data = await response.json();
    setConvertedCode(data.message);
    console.log(data);
  };
  return (
    <div className="navbar-compiler">
      <p>App-Name</p>
      <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
      />
      {/* <label>Font Size</label> */}
      {/* <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      /> */}
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a />
      <a /><a /><a /><a /><a /><a /><a />
      <div className={styles.popupButtonContainer}>
        <Popup
          trigger={
            <a className={styles.pointerLink}>
              <img
                className={styles.expandArrowIcon}
                alt=""
                src="/expand-arrow@2x.png"
              />
            </a>
          }
          position="bottom left"
          contentStyle={{
            width: "550px",
            padding: "20px",
            height: "700px",
            overflowY: "auto",
          }}
          closeOnDocumentClick={false}
        >
          <div className={styles.popupMenu}>
            <h1>Write Your Question</h1>
            <form onSubmit={handleSubmit}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type Here To Get Code"
                rows={5}
                cols={30}
                style={{
                  resize: "none", // Prevent resizing
                  border: "1px solid #ccc", // Add border
                  padding: "10px", // Add padding
                }}
              />
              <br />
              <button
                type="submit"
                className={`${styles.mybtn} btn btn-primary`}
              >
                Convert
              </button>
            </form>
            <hr className={styles.rule} />
            <div>
              <h2>Your Code</h2>
              <pre className={styles.codeArea}>{convertedCode}</pre>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default Navbar;
