import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";

const { Schema, model } = mongoose;

const FreeCourses = new Schema(
  {
    TeacherName: {
      type: String,
    },
    BriefAssignmentContent: {
      type: String,
    },
    TeacherType: {
      type: String,
    },
    courseid: {
      type: String,
    },
    Collegeid: {
      type: String,
    },
    Teacherid: {
      type: String,
    },
    AssignmentContent: {
      type: String,
    },
    TestCases: {
      testCases1: String,
      testCases2: String,
      testCases3: String,
    },
    ExpectedOutput: {
      expectedOutput1: String,
      expectedOutput2: String,
      expectedOutput3: String,
    },
    TestCaseMarkDistribution: {
      type: String,
    },
    hintAboutQuestion: {
      type: String,
    },
    timeLimit: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    userGroup: {
      type: String,
    },
    TestCasesStatus: {
      testCasesStatus1: {
        type: String,
        default: "NotAttempted",
      },
      testCasesStatus2: {
        type: String,
        default: "NotAttempted",
      },
      testCasesStatus3: {
        type: String,
        default: "NotAttempted",
      },
    },
  },
  {
    collection: "FreeCoursesRecord",
  }
);

const FreeCoursesRecord = model("FreeCoursesRecord", FreeCourses);
export default FreeCoursesRecord;
