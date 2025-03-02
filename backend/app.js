import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { UserInfo } from "./userDetails.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import assignmentRecord from "./AssignmentDetails.js";
import courseRecord from "./CourseDetails.js";
import { spawn } from "child_process";
import { time } from "console";
import { SubittedCodeInfo } from "./SubmittedCode.js";
import FeedbackRecord from "./Feedback.js";
import FreeCoursesRecord from "./FreeCourses.js";

const JWT_SECRET =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM`1234567890-=[];',./~!@#$%^&*()_+{}|:<>?";
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const mongoUrl =
  "mongodb+srv://harsh:harsh@harsh.bevwaya.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, mobile, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    const oldUserMobile = await User.findOne({ mobile });

    if (oldUser || oldUserMobile) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      mobile,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "440m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
app.post("/updateUser", async (req, res) => {
  const { id, fname, lname, token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    await User.updateOne(
      { _id: id },
      {
        $set: {
          fname: fname,
          lname: lname,
        },
      }
    );
    return res.json({ status: "ok", data: "updated" });
  } catch (error) {
    return res.json({ status: "error", data: error });
  }
});
app.post("/updateStudentGroup", async (req, res) => {
  const { email, token, group } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    await User.updateOne(
      { email: email },
      {
        $set: {
          userGroup: group,
        },
      }
    );
    return res.json({ status: "ok", data: "updated" });
  } catch (error) {
    return res.json({ status: "error", data: error });
  }
});

app.post("/forget-user", async (req, res) => {
  const { email, password, mobile } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    const oldUserMobile = await User.findOne({ mobile });

    if (!oldUser || !oldUserMobile) {
      return res.send({ status: "error", data: error });
    }
    await User.updateOne(
      {
        email: email,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/getAllStudent", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const allUser = await User.find({
      userType: "Student",
    });
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});
app.post("/getAllUser", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

// app.post("/updateUser", async (req, res) => {
//   const { id, fname, lname } = req.body;
//   try {
//     await User.updateOne(
//       { _id: id },
//       {
//         $set: {
//           fname: fname,
//           lname: lname,
//         },
//       }
//     );
//     return res.json({ status: "ok", data: "updated" });
//   } catch (error) {
//     return res.json({ status: "error", data: error });
//   }
// });

// app.post("/deleteUser", async (req, res) => {
//   const { userid } = req.body;
//   try {
//     User.deleteOne({ _id: userid }, function (err, res) {
//       console.log(err);
//     });
//     res.send({ status: "Ok", data: "Deleted" });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    const result = await User.deleteOne({ _id: userid });
    console.log(result); // Log the result if needed
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", error: "Failed to delete user" });
  }
});

app.listen(5000, () => {
  console.log("Server Started");
});

//Assignment

const Assignment = mongoose.model("assignmentRecord");

app.post("/registerAssignment", async (req, res) => {
  const {
    Collegeid,
    Teacherid,
    AssignmentContent,
    TestCases: { testCases1, testCases2, testCases3 },
    ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
    hintAboutQuestion,
    timeLimit,
    TestCaseMarkDistribution,
    userGroup,
    BriefAssignmentContent,
    TeacherName,
    TeacherType,
  } = req.body;

  try {
    await Assignment.create({
      Collegeid,
      Teacherid,
      AssignmentContent,
      TestCases: { testCases1, testCases2, testCases3 },
      ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
      TestCasesStatus: {
        testCasesStatus1: "NotAttempted",
        testCasesStatus2: "NotAttempted",
        testCasesStatus3: "NotAttempted",
      },
      hintAboutQuestion,
      timeLimit,
      TestCaseMarkDistribution,
      userGroup,
      BriefAssignmentContent,
      TeacherType,
      TeacherName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
app.post("/registerAssignmentFromCourse", async (req, res) => {
  const {
    Collegeid,
    Teacherid,
    AssignmentContent,
    courseid,
    TestCases: { testCases1, testCases2, testCases3 },
    ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
    hintAboutQuestion,
    timeLimit,
    TestCaseMarkDistribution,
    userGroup,
    BriefAssignmentContent,
    TeacherName,
    TeacherType,
  } = req.body;

  try {
    await Assignment.create({
      Collegeid,
      Teacherid,
      courseid,
      AssignmentContent,
      TestCases: { testCases1, testCases2, testCases3 },
      ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
      TestCasesStatus: {
        testCasesStatus1: "NotAttempted",
        testCasesStatus2: "NotAttempted",
        testCasesStatus3: "NotAttempted",
      },
      hintAboutQuestion,
      timeLimit,
      TestCaseMarkDistribution,
      userGroup,
      BriefAssignmentContent,
      TeacherType,
      TeacherName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/assignmentData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const allAssignment = await Assignment.find({});
    res.send({ status: "ok", data: allAssignment });
  } catch (error) {
    console.log(error);
  }
});

app.post("/assignmentDetails/:id", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const { id } = req.params;
    Assignment.findOne({ _id: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/assignmentDetailsFromCourse", async (req, res) => {
  const { token } = req.body;
  const { courseid } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    await Assignment.find({
      courseid: courseid,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
//Course

const Course = mongoose.model("courseRecord");

app.post("/registerCourse", async (req, res) => {
  const {
    Collegeid,
    Syllabus,
    Teacherid,
    CourseContent,
    userGroup,
    BriefCourseContent,
    TeacherName,
    TeacherType,
  } = req.body;

  try {
    await Course.create({
      Collegeid,
      Teacherid,
      CourseContent,
      Syllabus,
      userGroup,
      BriefCourseContent,
      TeacherType,
      TeacherName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/courseData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const allCourse = await Course.find({});
    res.send({ status: "ok", data: allCourse });
  } catch (error) {
    console.log(error);
  }
});

app.post("/courseDetails/:id", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const { id } = req.params;
    Course.findOne({ _id: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

//compiler

app.post("/compile", (req, res) => {
  const { code, input } = req.body;
  console.log(input);

  try {
    // Python command to execute code
    const pythonProcess = spawn("python", ["-c", code]);

    let output = "";
    let error = "";
    let terminated = false;

    // Handle output from the Python process
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle errors from the Python process
    pythonProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    // When the Python process exits
    pythonProcess.on("exit", (code) => {
      if (!terminated) {
        if (code === 0) {
          res.json({ output });
        } else {
          res.json({ output });
        }
      }
    });

    // Provide input to the Python process if there is any
    if (input) {
      pythonProcess.stdin.write(input);
      pythonProcess.stdin.end();
    }

    // Timeout to handle infinite loops
    const timeout = setTimeout(() => {
      terminated = true;
      pythonProcess.kill("SIGINT"); // Forcefully terminate the Python process
      output =
        " 'Execution timed out OR 'Possible infinite loop' OR 'Graphical Data is Showing'";
      // res
      //   .status(500)
      //   .json({ error: "Execution timed out. Possible infinite loop." });
      res.json({ output });
    }, 10000); // 5 seconds timeout, adjust as needed

    // Clear timeout when the Python process exits before the timeout
    pythonProcess.on("exit", () => {
      clearTimeout(timeout);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/checkTestCases", (req, res) => {
  const { code, input1 } = req.body;

  try {
    // Python command to execute code
    const pythonProcess = spawn("python", ["-c", code]);

    let output = "";
    let error = "";
    let terminated = false;
    let action = "";

    // Handle output from the Python process
    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Handle errors from the Python process
    pythonProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    // When the Python process exits

    // Provide input to the Python process if there is any
    if (input1) {
      pythonProcess.stdin.write(input1);
      pythonProcess.stdin.end();
    }

    // Timeout to handle infinite loops
    const timeout = setTimeout(() => {
      terminated = true;
      pythonProcess.kill("SIGINT"); // Forcefully terminate the Python process
      output =
        " 'Execution timed out OR 'Possible infinite loop' OR 'Graphical Data is Showing'";
      // res
      //   .status(500)
      //   .json({ error: "Execution timed out. Possible infinite loop." });
      res.json({ output });
    }, 10000); // 5 seconds timeout, adjust as needed

    if (output == 3) {
      action = "Passed";
    } else {
      action = "failed";
    }
    pythonProcess.on("exit", (code) => {
      if (!terminated) {
        if (code === 0) {
          res.json({ output });
          console.log(output);
        } else {
          res.json({ output });
        }
      }
    });

    // Clear timeout when the Python process exits before the timeout
    pythonProcess.on("exit", () => {
      clearTimeout(timeout);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

const SubmittedCode = mongoose.model("SubittedCodeInfo");

// app.post("/registerSubmittedCode", async (req, res) => {
//   const {
//     assignmentId,
//     subittedCode,
//     testCasesStatus1,
//     testCasesStatus2,
//     testCasesStatus3,
//     token,
//   } = req.body;
//   try {
//     const user = jwt.verify(token, JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user == "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }
//     const useremail = user.email;
//     const oldSubmittedAssignmentId = await SubmittedCode.findOne({
//       assignmentId,
//     });
//     const oldSubmitteduserId = await SubmittedCode.findOne({
//       userMail: useremail,
//     });
//     await SubmittedCode.updateOne(
//       { assignmentId: assignmentId, userMail: useremail },
//       {
//         $set: {
//           assignmentId,
//           subittedCode,
//           testCasesStatus1,
//           testCasesStatus2,
//           testCasesStatus3,
//           userMail: useremail,
//         },
//       }
//     );
//     // if (oldSubmittedAssignmentId && oldSubmitteduserId) {
//     //   await SubmittedCode.updateOne(
//     //     { assignmentId: assignmentId, userMail: useremail },
//     //     {
//     //       $set: {
//     //         subittedCode,
//     //         testCasesStatus1,
//     //         testCasesStatus2,
//     //         testCasesStatus3,
//     //       },
//     //     }
//     //   );
//     // } else {
//     //   await SubmittedCode.create({
//     //     assignmentId,
//     //     subittedCode,
//     //     testCasesStatus1,
//     //     testCasesStatus2,
//     //     testCasesStatus3,
//     //     userMail: useremail,
//     //   });
//     // }
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });
app.post("/registerSubmittedCode", async (req, res) => {
  const {
    assignmentId,
    subittedCode,
    testCasesStatus1,
    testCasesStatus2,
    testCasesStatus3,
    courseid,
    userGroup,
    token,
  } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });

    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;

    // Update the document if it exists, otherwise insert a new document
    await SubmittedCode.updateOne(
      { assignmentId: assignmentId, userMail: useremail },
      {
        $set: {
          subittedCode,
          testCasesStatus1,
          testCasesStatus2,
          testCasesStatus3,
          userGroup,
          courseid,
        },
      },
      { upsert: true }
    );

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/fetchSubmittedCode", async (req, res) => {
  const { assignmentId } = req.body;
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    await SubmittedCode.findOne({
      assignmentId: assignmentId,
      userMail: useremail,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
app.post("/getAllSubmittedCode", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    await SubmittedCode.find({
      userMail: useremail,
    })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.log(error);
  }
});
app.post("/getAllSubmittedCodeAdmin", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    await SubmittedCode.find({})
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.log(error);
  }
});
app.post("/getAllSubmittedCodeAdminByCourse", async (req, res) => {
  const { token, courseid } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    await SubmittedCode.find({ courseid: courseid })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.log(error);
  }
});
const Feedback = mongoose.model("FeedbackRecord");

app.post("/registerFeedback", async (req, res) => {
  const { feedback } = req.body;
  try {
    await Feedback.create({
      feedback,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/adminUserData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        if (data.userType === "Admin") {
          res.send({ status: "ok", data: data });
        } else {
          res.send({ status: "error", data: "token expired" });
        }
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

const FreeCourses = mongoose.model("FreeCoursesRecord");

app.post("/registerFreeAssignment", async (req, res) => {
  const {
    Collegeid,
    Teacherid,
    AssignmentContent,
    TestCases: { testCases1, testCases2, testCases3 },
    ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
    hintAboutQuestion,
    timeLimit,
    TestCaseMarkDistribution,
    userGroup,
    BriefAssignmentContent,
    TeacherName,
    TeacherType,
  } = req.body;

  try {
    await FreeCourses.create({
      Collegeid,
      Teacherid,
      AssignmentContent,
      TestCases: { testCases1, testCases2, testCases3 },
      ExpectedOutput: { expectedOutput1, expectedOutput2, expectedOutput3 },
      TestCasesStatus: {
        testCasesStatus1: "NotAttempted",
        testCasesStatus2: "NotAttempted",
        testCasesStatus3: "NotAttempted",
      },
      hintAboutQuestion,
      timeLimit,
      TestCaseMarkDistribution,
      userGroup,
      BriefAssignmentContent,
      TeacherType,
      TeacherName,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/freeCourses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    FreeCourses.find({ userGroup: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
app.post("/freeCoursesDetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    FreeCourses.findOne({ _id: id })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});
