var express = require("express");
var router = express.Router();
const SportRecordController = require("../controllers/SportRecordController");
const SportRecordModel = require("../model/SportRecordModel");

// //增加运动记录
// router.post("/addSportRecord", SportRecordController.addSportRecord);
// //查找运动记录列表
// router.post("/getList", SportRecordController.getList);

module.exports = router;
