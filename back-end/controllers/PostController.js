const PostService = require("../services/PostService");
const SearchService = require("../services/SearchService");
const SearchController = require("../controllers/SearchController");

const PostController = {
  addPost: async (req, res) => {
    const { user_id, username, userHeader, title, content, img, time, type } =
      req.body;
    const result = await PostService.addPost(
      user_id,
      username,
      userHeader,
      title,
      content,
      img,
      time,
      type
    );
    if (result.success) {
      res.send({
        data: result.data,
        success: true,
      });
    } else {
      res.send({ success: false, reason: result.message });
    }
  },
  getList: async (req, res) => {
    const { curPage, number } = req.body;
    const result = await PostService.getList(curPage, number);
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  getListByid: async (req, res) => {
    const { user_id, curPage, number } = req.body;
    const result = await PostService.getListByid(user_id, curPage, number);
    if (result.data.length != 0) {
      res.send({
        success: true,
        total: result.total,
        data: result.data,
      });
    } else {
      res.send({
        success: false,
      });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.body;
    const result = await PostService.deletePost(id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getDetails: async (req, res) => {
    const { _id } = req.body;
    const result = await PostService.getDetails(_id);
    res.send(result);
  },
  getDetailsByParams: async (req, res) => {
    const { user_id, content, type, time, click } = req.body;
    const result = await PostService.getDetailsByParams(content, type, time);
    if (click) {
      const searchResult = await SearchController.addSearch({
        user_id,
        content,
        type,
        time,
      });
    }
    res.send(result);
  },
};

module.exports = PostController;
