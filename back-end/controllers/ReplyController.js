const ReplyService = require("../services/ReplyService");

const ReplyController = {
  addReply: async (req, res) => {
    const { post_id, user_id, content, time } = req.body;
    const result = await ReplyService.addReply(post_id, user_id, content, time);
    console.log(result);
    if (result.success) {
      res.send({
        data: result.data,
        success: true,
      });
    } else {
      res.send({ success: false, reason: result.message });
    }
  },
  deleteReply: async (req, res) => {
    const { id } = req.body;
    const result = await ReplyService.deleteReply(id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getListById: async (req, res) => {
    const { curPage, number, post_id } = req.body;
    const result = await ReplyService.getListById(curPage, number, post_id);
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
  getListByUserId: async (req, res) => {
    const { user_id } = req.body;
    const result = await ReplyService.getListByUserId(user_id);
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
};

module.exports = ReplyController;
