import { time } from "console";
import mongoose from "mongoose";
import { type } from "os";

const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    feedback:{
        type: String,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
  },
  {
    collection: "FeedbackInfo",
  }
);

const FeedbackRecord = model("FeedbackRecord", feedbackSchema);
export default FeedbackRecord;
