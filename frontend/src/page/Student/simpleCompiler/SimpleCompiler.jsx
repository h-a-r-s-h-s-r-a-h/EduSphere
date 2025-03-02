import { useState, useEffect } from "react";
import "./SimpleCompiler.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import Axios from "axios";
import spinner from "./spinner.svg";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SimpleCompiler() {
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");
  const [userData, setUserData] = useState([]);
  const [codeData, setcodeData] = useState([]);

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");
  //   const [testCases1, setTestCases1] = useState("");
  const [testCasesStatus1, setTestCasesStatus1] = useState("Not Submited");
  const [testCasesStatus2, setTestCasesStatus2] = useState("Not Submited");
  const [testCasesStatus3, setTestCasesStatus3] = useState("Not Submited");

  const [loading, setLoading] = useState(false);
  const [verified, setverified] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const { id } = useParams();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const userId = searchParams.get("userId");
  // const assignmentId = searchParams.get("assignmentId");
  const { id: assignmentId } = useParams();

  const options = {
    fontSize: fontSize,
  };
  
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      alert("your editor is blank or not active\nPress Enter on your editor.");

      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:5000/compile`, {
      code: userCode,
      language: userLang,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }
  async function saveCode() {
    if (userCode === ``) {
      return;
    }
    Axios.post(`http://localhost:5000/registerSubmittedCode`, {
      assignmentId: assignmentDetails._id,
      userId: userData._id,
      token: window.localStorage.getItem("token"),
      subittedCode: userCode,
      testCasesStatus1: testCasesStatus1,
      testCasesStatus2: testCasesStatus2,
      testCasesStatus3: testCasesStatus3,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          console.log("code saved");
        } else {
          alert("Some error occured");
        }
      });
    toast.success("Code has successfully Saved");
  }

  async function checkTestCases1() {
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:5000/checkTestCases`, {
      code: userCode,
      language: userLang,
      input1: assignmentDetails.TestCases.testCases1,
    }).then((res) => {
      if (
        String(res.data.output.trim()) ===
        String(assignmentDetails.ExpectedOutput.expectedOutput1.trim())
      ) {
        setTestCasesStatus1("passed");
        toast.success("Test Case 1 Passed");
      } else {
        setTestCasesStatus1("failed");
        toast.error("Test Case 1 Failed");
      }
    });
  }

  async function checkTestCases2() {
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:5000/checkTestCases`, {
      code: userCode,
      language: userLang,
      input1: assignmentDetails.TestCases.testCases2,
    }).then((res) => {
      if (
        String(res.data.output.trim()) ===
        String(assignmentDetails.ExpectedOutput.expectedOutput2.trim())
      ) {
        setTestCasesStatus2("passed");
        toast.success("Test Case 2 Passed");
      } else {
        setTestCasesStatus2("failed");
        toast.error("Test Case 2 Failed");
      }
    });
  }
  async function checkTestCases3() {
    if (userCode === ``) {
      return;
    }

    // Post request to compile endpoint
    Axios.post(`http://localhost:5000/checkTestCases`, {
      code: userCode,
      language: userLang,
      input1: assignmentDetails.TestCases.testCases3,
    }).then((res) => {
      if (
        String(res.data.output.trim()) ===
        String(assignmentDetails.ExpectedOutput.expectedOutput3.trim())
      ) {
        setTestCasesStatus3("passed");
        toast.success("Test Case 3 Passed");
      } else {
        setTestCasesStatus3("failed");
        toast.error("Test Case 3 Failed");
      }
    });
  }

  async function handleButtonClick() {
    await checkTestCases1();
    await checkTestCases2();
    await checkTestCases3();
    setverified(true);
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }
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
        setUserData(data.data);
        if (data.data == "token expired") {
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/assignmentDetails/${id}`, {
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

        setAssignmentDetails(data.data);
        if (data.data == "token expired") {
          //   alert("Token expired login again");
          window.localStorage.clear();
          window.location.replace("/");
        }
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/fetchSubmittedCode", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        assignmentId: assignmentId,
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "SubmittedCodeData");
        setcodeData(data.data);
      });
  }, []);

  return (
    <div className="Compiler">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="middle-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue={"#Enter your code here"}
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
          
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <img src={spinner} alt="Loading..." />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SimpleCompiler;
