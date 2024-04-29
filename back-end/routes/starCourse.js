var express = require("express");
var router = express.Router();
const StarCourseController = require("../controllers/StarCourseController");
const StarCourseModel = require("../model/StarCourseModel");

// //增加收藏课程
router.post("/addStarCourse", StarCourseController.addStarCourse);
// //更新收藏课程
router.post("/updateStarCourse", StarCourseController.updateStarCourse);
// //删除收藏课程
router.post("/deleteStarCourse", StarCourseController.deleteStarCourse);
// //查找收藏课程列表
router.post("/getList", StarCourseController.getList);
// //查找收藏课程
router.post("/getDetails", StarCourseController.getDetails);
module.exports = router;
