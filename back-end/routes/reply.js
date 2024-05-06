var express = require("express");
var router = express.Router();
const ReplyController = require("../controllers/ReplyController");
const ReplyModel = require("../model/ReplyModel");

// //发布回复
router.post("/addReply", ReplyController.addReply);
// //删除回复
router.post("/deleteReply", ReplyController.deleteReply);
// //修改回复
// router.post("/updateReply", ReplyController.updateReply);
// //根据帖子ID查找回复列表
router.post("/getListById", ReplyController.getListById);
// //根据用户ID查找回复列表
router.post("/getListByUserId", ReplyController.getListByUserId);
// //查找回复
// router.post("/getDetails", ReplyController.getDetails);

module.exports = router;
