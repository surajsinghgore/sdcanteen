import mongoose from "mongoose";
const UserId = new mongoose.Schema({
  
  ReportUserId: {
    type: mongoose.Schema.Types.ObjectId,
  ref: "clientdata",
    required: true,
  }
});

const CommentReport = new mongoose.Schema(
  {
    CommentReportId: {
       type: mongoose.Schema.Types.ObjectId,
  ref: "itemratings",
    required: true,
    },
    MessageSenderId:{ type: mongoose.Schema.Types.ObjectId,
  ref: "clientdatas",
    required: true,},
    NumberOfReports: {
      type: Number,
      required: true,
    },
  Message: { type: String, required: true, lowercase: true },
  IdsOfUserReport:[UserId]
  }
);

mongoose.models = {};

const CommentReports =
  mongoose.models.CommentReport || mongoose.model("CommentReport", CommentReport);

export default CommentReports;
