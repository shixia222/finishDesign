var express = require("express");
var router = express.Router();
const PostController = require("../controllers/PostController");
const PostModel = require("../model/PostModel");

// //发布帖子
router.post("/addPost", PostController.addPost);
// //删除帖子
router.post("/deletePost", PostController.deletePost);
// //修改帖子
// router.post("/updatePost", PostController.updatePost);
// //查找帖子列表
router.post("/getList", PostController.getList);
// //查找帖子列表
router.post("/getListByid", PostController.getListByid);
// //查找帖子
router.post("/getDetails", PostController.getDetails);
// //查找帖子
router.post("/getDetailsByParams", PostController.getDetailsByParams);
router.post("/getDetailsByType", PostController.getDetailsByType);


module.exports = router;
