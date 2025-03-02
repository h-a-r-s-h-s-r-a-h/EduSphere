import { useState, useEffect } from "react";
import "./Compiler.css";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import Axios from "axios";
import spinner from "./spinner.svg";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Compiler() {
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");
  const [userData, setUserData] = useState([]);
  const [codeData, setcodeData] = useState([]);

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");
  const [testCases1, setTestCases1] = useState("");
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
  const saveCode = () => {
    fetch("http://localhost:5000/registerSubmittedCode", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        assignmentId: assignmentDetails._id,
        userId: userData._id,
        token: window.localStorage.getItem("token"),
        subittedCode: userCode,
        testCasesStatus1: testCasesStatus1,
        testCasesStatus2: testCasesStatus2,
        testCasesStatus3: testCasesStatus3,
        userGroup: userData.userGroup,
        courseid: assignmentDetails.courseid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          toast("Your Code is successfully submitted.");
        } else {
          toast("Something went wrong.");
        }
      });
  };
  // const saveCode = () => {
  //   if (userCode === ``) {
  //     return;
  //   }
  //   Axios.post(`http://localhost:5000/registerSubmittedCode`, {
  //     assignmentId: assignmentDetails._id,
  //     userId: userData._id,
  //     token: window.localStorage.getItem("token"),
  //     subittedCode: userCode,
  //     testCasesStatus1: testCasesStatus1,
  //     testCasesStatus2: testCasesStatus2,
  //     testCasesStatus3: testCasesStatus3,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status == "ok") {
  //         console.log("code saved");
  //       } else {
  //         alert("Some error occured");
  //       }
  //     });
  //   toast.success("Code has successfully Saved");
  // };

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
        <div className="left-container">
          <h1 className="question-no">Question</h1>
          <hr />
          <p className="QuestionName">
            {assignmentDetails.BriefAssignmentContent}
          </p>
          <p className="assignment-content">
            {assignmentDetails.AssignmentContent}
          </p>
          <div className="big-test-cases">
            <h2 className="test-cases">Test Cases1:-</h2>
            <div className="test-cases-box">
              <textarea
                disabled
                id=""
                value={
                  assignmentDetails &&
                  assignmentDetails.TestCases &&
                  assignmentDetails.TestCases.testCases1
                }
              ></textarea>
              <h2>Expected Output:-</h2>
              <h2>
                {assignmentDetails &&
                  assignmentDetails.ExpectedOutput &&
                  assignmentDetails.ExpectedOutput.expectedOutput1}
              </h2>
              <h1>Test Cases Status :- {testCasesStatus1}</h1>
            </div>

            <hr />
            <h2 className="test-cases">Test Cases2:-</h2>
            <div className="test-cases-box">
              <textarea
                disabled
                id=""
                value={
                  assignmentDetails &&
                  assignmentDetails.TestCases &&
                  assignmentDetails.TestCases.testCases2
                }
              ></textarea>
              <h2>Expected Output:-</h2>
              <h2>
                {assignmentDetails &&
                  assignmentDetails.ExpectedOutput &&
                  assignmentDetails.ExpectedOutput.expectedOutput2}
              </h2>
              <h1>Test Cases Status :- {testCasesStatus2}</h1>
            </div>

            <hr />
            <h2 className="test-cases">Test Cases3:-</h2>
            <div className="test-cases-box">
              <textarea
                disabled
                id=""
                value={
                  assignmentDetails &&
                  assignmentDetails.TestCases &&
                  assignmentDetails.TestCases.testCases3
                }
              ></textarea>
              <h2>Expected Output:-</h2>
              <h2>
                {assignmentDetails &&
                  assignmentDetails.ExpectedOutput &&
                  assignmentDetails.ExpectedOutput.expectedOutput3}
              </h2>
              <h1>Test Cases Status :- {testCasesStatus1}</h1>
            </div>
            <p className="hintAboutQuestion">
              {assignmentDetails.hintAboutQuestion}
            </p>
          </div>

          <hr />
        </div>
        <div className="middle-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            value={
              codeData && codeData.subittedCode
                ? codeData.subittedCode
                : "#Enter your code here"
            }
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
          <button className="save-btn" onClick={() => handleButtonClick()}>
            Submit
          </button>
          {verified ? (
            <button className="upload-btn" onClick={() => saveCode()}>
              Save To Cloud
            </button>
          ) : null}
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

export default Compiler;

// import { useState, useEffect } from "react";
// import "./Compiler.css";
// import Editor from "@monaco-editor/react";
// import Navbar from "./Navbar";
// import Axios from "axios";
// import spinner from "./spinner.svg";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Compiler() {
//   const [userCode, setUserCode] = useState(``);
//   const [userLang, setUserLang] = useState("python");
//   const [userTheme, setUserTheme] = useState("vs-dark");
//   const [userData, setUserData] = useState({});
//   const [assignmentDetails, setAssignmentDetails] = useState({});
//   const [fontSize, setFontSize] = useState(20);
//   const [userInput, setUserInput] = useState("");
//   const [userOutput, setUserOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [verified, setVerified] = useState(false);
//   const [testCasesStatus, setTestCasesStatus] = useState({
//     test1: "Not Submitted",
//     test2: "Not Submitted",
//     test3: "Not Submitted",
//   });
//   const { id: assignmentId } = useParams();

//   const options = { fontSize };

//   // Compile code
//   function compile() {
//     setLoading(true);
//     if (userCode.trim() === "") {
//       toast.warn("Your editor is blank. Please enter code.");
//       setLoading(false);
//       return;
//     }

//     Axios.post(`http://localhost:5000/compile`, {
//       code: userCode,
//       language: userLang,
//       input: userInput,
//     })
//       .then((res) => {
//         setUserOutput(res.data.output);
//       })
//       .catch((error) => {
//         console.error("Error compiling code:", error);
//         toast.error("Compilation failed.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }

//   // Save code
//   const saveCode = () => {
//     fetch("http://localhost:5000/registerSubmittedCode", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         assignmentId: assignmentDetails._id,
//         userId: userData._id,
//         token: window.localStorage.getItem("token"),
//         submittedCode: userCode,
//         testCasesStatus1: testCasesStatus.test1,
//         testCasesStatus2: testCasesStatus.test2,
//         testCasesStatus3: testCasesStatus.test3,
//         userGroup: userData.userGroup,
//         courseid: assignmentDetails.courseid,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         data.status === "ok"
//           ? toast.success("Your code was successfully submitted.")
//           : toast.error("Something went wrong.");
//       })
//       .catch((error) => {
//         console.error("Save error:", error);
//         toast.error("Failed to save code.");
//       });
//   };

//   // Check individual test cases
//   const checkTestCase = async (testCase, expectedOutput, testKey) => {
//     if (!testCase || userCode.trim() === "") {
//       toast.warn(`Test Case ${testKey} is not defined or code is empty.`);
//       return;
//     }

//     try {
//       const res = await Axios.post(`http://localhost:5000/checkTestCases`, {
//         code: userCode,
//         language: userLang,
//         input1: testCase,
//       });

//       if (res.data.output.trim() === expectedOutput.trim()) {
//         setTestCasesStatus((prev) => ({ ...prev, [testKey]: "Passed" }));
//         toast.success(`Test Case ${testKey.slice(-1)} Passed`);
//       } else {
//         setTestCasesStatus((prev) => ({ ...prev, [testKey]: "Failed" }));
//         toast.error(`Test Case ${testKey.slice(-1)} Failed`);
//       }
//     } catch (error) {
//       console.error(`Error in Test Case ${testKey}:`, error);
//       toast.error(`Error running Test Case ${testKey.slice(-1)}`);
//     }
//   };

//   // Handle all test cases
//   const handleTestCases = async () => {
//     const { TestCases, ExpectedOutput } = assignmentDetails;

//     if (TestCases && ExpectedOutput) {
//       await checkTestCase(TestCases.testCases1, ExpectedOutput.expectedOutput1, "test1");
//       await checkTestCase(TestCases.testCases2, ExpectedOutput.expectedOutput2, "test2");
//       await checkTestCase(TestCases.testCases3, ExpectedOutput.expectedOutput3, "test3");
//       setVerified(true);
//     } else {
//       toast.error("Test case data is missing.");
//     }
//   };

//   useEffect(() => {
//     // Fetch user data and assignment details (simulated)
//     const fetchData = async () => {
//       try {
//         const userRes = await Axios.get("http://localhost:5000/getUserData", {
//           headers: { token: window.localStorage.getItem("token") },
//         });
//         setUserData(userRes.data);

//         const assignmentRes = await Axios.get(
//           `http://localhost:5000/getAssignmentDetails/${assignmentId}`
//         );
//         setAssignmentDetails(assignmentRes.data);
//       } catch (error) {
//         console.error("Data fetch error:", error);
//         toast.error("Error fetching data.");
//       }
//     };
//     fetchData();
//   }, [assignmentId]);

//   return (
//     <div className="Compiler">
//       <Navbar />
//       <div className="editor-container">
//         <Editor
//           height="400px"
//           width="100%"
//           theme={userTheme}
//           language={userLang}
//           value={userCode}
//           onChange={(value) => setUserCode(value)}
//           options={options}
//         />
//         <button onClick={compile}>Run Code</button>
//         <button onClick={saveCode}>Submit Code</button>
//         <button onClick={handleTestCases}>Run Test Cases</button>
//         {loading ? <img src={spinner} alt="Loading..." /> : <p>Output: {userOutput}</p>}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Compiler;
