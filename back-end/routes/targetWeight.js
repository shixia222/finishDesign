var express = require("express");
var router = express.Router();
const TargetWeightController = require("../controllers/TargetWeightController");
const TargetWeightModel = require("../model/TargetWeightModel");

// //新增加目标体重
router.post("/addTargetWeight", TargetWeightController.addTargetWeight);
// //修改目标体重
router.post("/updateTargetWeight", TargetWeightController.updateTargetWeight);
// //查找目标体重
router.post("/getDetails", TargetWeightController.getDetails);

module.exports = router;
