var express = require("express");
var router = express.Router();
const MomentController = require("../controllers/MomentController");
const MomentModel = require("../model/MomentModel");

// //查找动态列表
// router.post("/getList", MomentController.getList);
// //增加喜欢/搜藏动态
router.post("/addMoment", MomentController.addMoment);
// //修改动态信息
router.post("/updateMoment", MomentController.updateMoment);
// //获取动态信息
router.post("/getMomentByPostId", MomentController.getMomentByPostId);
// //删除动态信息
router.post("/deleteMomentByPostId", MomentController.deleteMomentByPostId);
// //详情
router.post("/getDetails", MomentController.getDetails);

module.exports = router;
