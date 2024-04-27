const PostService = require("../services/PostService");

const PostController = {
  addPost: async (req, res) => {
    const { user_id, username, userHeader, title, content, img, time, type } =
      req.body;
    console.log(req.body);
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
  getDetails: async (req, res) => {
    const { _id } = req.body;
    const result = await PostService.getDetails(_id);
    res.send(result);
  },
};

module.exports = PostController;
