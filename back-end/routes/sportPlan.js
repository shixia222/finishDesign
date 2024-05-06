var express = require("express");
var router = express.Router();
const SportPlanController = require("../controllers/SportPlanController");
const SportPlanModel = require("../model/SportPlanModel");

// //增加训练计划
router.post("/addSportPlan", SportPlanController.addSportPlan);
// //查找训练计划列表
router.post("/getList", SportPlanController.getList);
// //查找训练计划详情
router.post("/getDetails", SportPlanController.getDetails);

module.exports = router;
