import mongoose from "mongoose";

const SubittedCodeSchema = new mongoose.Schema(
  {
    assignmentId: String,
    userId: String,
    subittedCode: {
      type: String,
      default: "# Enter your code here",
    },
    testCasesStatus1: {
      type: String,
      default: "NotAttempted",
    },
    testCasesStatus2: {
      type: String,
      default: "NotAttempted",
    },
    courseid: {
      type: String,
    },
    testCasesStatus3: {
      type: String,
      default: "NotAttempted",
    },
    userMail: {
      type: String,
    },
    userGroup: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  },
  {
    collection: "SubmittedCodeInfo",
  }
);

export const SubittedCodeInfo = mongoose.model(
  "SubittedCodeInfo",
  SubittedCodeSchema
);
