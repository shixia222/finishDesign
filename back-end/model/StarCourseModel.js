const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StarCourseSchema = new Schema({
  user_id: String,
  star_course: [{ type: String }],
});

const starCourseModel = mongoose.model("starCourse", StarCourseSchema);

module.exports = starCourseModel;
