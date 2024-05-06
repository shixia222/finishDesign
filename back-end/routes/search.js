var express = require("express");
var router = express.Router();
const SearchController = require("../controllers/SearchController");
const SearchModel = require("../model/SearchModel");

// //增加历史搜索
router.post("/addSearch", SearchController.addSearch);
// //查找历史搜索列表
router.post("/getList", SearchController.getList);
// //清除历史搜索列表
router.post("/clean", SearchController.clean);

module.exports = router;
