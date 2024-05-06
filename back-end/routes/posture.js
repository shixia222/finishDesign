var express = require("express");
var router = express.Router();
const PostureController = require("../controllers/PostureController");
const PostureModel = require("../model/PostureModel");

// //新的体态分析
router.post("/addPosture", PostureController.addPosture);
// //查找体态分析
router.post("/getDetails", PostureController.getDetails);

module.exports = router;
