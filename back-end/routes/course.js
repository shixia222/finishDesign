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
// //查找课程详情
router.post("/getDetails", CourseController.getDetails);
// //查找课程列表
router.post("/getList", CourseController.getList);
// //查找课程列表根据类别
router.post("/getListByType", CourseController.getListByType);
module.exports = router;
