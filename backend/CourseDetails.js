import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    Syllabus: {
      type: String,
    },
    TeacherName: {
      type: String,
    },
    BriefCourseContent: {
      type: String,
    },
    TeacherType: {
      type: String,
    },
    Collegeid: {
      type: String,
    },
    Teacherid: {
      type: String,
    },
    CourseContent: {
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
  },
  {
    collection: "CourseInfo",
  }
);

const courseRecord = model("courseRecord", courseSchema);
export default courseRecord;
