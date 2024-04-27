const PostModel = require("../model/PostModel");

const PostService = {
  addPost: (user_id, username, userHeader, title, content, img, time, type) => {
    return PostModel.create({
      user_id,
      username,
      userHeader,
      title,
      content,
      img,
      time,
      type,
    })
      .then((res) => {
        return {
          success: true,
          // data: data,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  getList: (curPage, number) => {
    return PostModel.find().then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  getDetails: (_id) => {
    return PostModel.find({ _id: _id });
  },
};

module.exports = PostService;
