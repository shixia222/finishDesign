const ReplyModel = require("../model/ReplyModel");

const ReplyService = {
  addReply: (post_id, user_id, content, time) => {
    return ReplyModel.create({
      post_id,
      user_id,
      content,
      time,
    })
      .then((res) => {
        const { _id } = res;
        console.log(_id);
        return {
          success: true,
          // data: data,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  deleteReply: (id) => {
    return ReplyModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getListById: (curPage, number, post_id) => {
    return ReplyModel.find({ post_id: post_id }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getListByUserId: (user_id) => {
    return ReplyModel.find({ user_id: user_id }).then((res) => {
      return {
        total: res.length,
        data: res,
      };
    });
  },
};

module.exports = ReplyService;
