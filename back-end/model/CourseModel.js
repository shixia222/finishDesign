const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const courseSchema = new Schema({
  course_name: String,
  content:String,
  img:String,
  video_path:String,
  type: String,
  resolution_type:String,
});

const CourseModel = mongoose.model("course", courseSchema);

module.exports = CourseModel;
