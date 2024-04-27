var express = require("express");
var router = express.Router();
const CourseController = require("../controllers/CourseController");
const CourseModel = require("../model/CourseModel");

// //增加课程
// router.post("/addCourse", CourseController.addCourse);
// //删除课程
// router.post("/deleteCourse", CourseController.deleteCourse);
// //修改课程
// router.post("/updateCourse", CourseController.updateCourse);
// //查找用户详情
// router.post("/getDetails", CourseController.getDetails);

module.exports = router;
