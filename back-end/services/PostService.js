const moment = require("moment");

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
  getListByid: (user_id, curPage, number) => {
    return PostModel.find({ user_id }).then((res) => {
      return {
        total: res.length,
        data: res.splice((curPage - 1) * number, number),
      };
    });
  },
  deletePost: (id) => {
    return PostModel.deleteOne({ _id: id }).then((res) => {
      if (res.deletedCount == 1) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getDetails: (_id) => {
    return PostModel.find({ _id: _id });
  },
  getDetailsByType: (type) => {
    return PostModel.find({ type: type });
  },
  getDetailsByParams: (content, type, time) => {
    // 将传入的时间字符串转换为 Moment.js 对象
    const specifiedTime = moment(time, "YYYY/MM/DD HH:mm:ss");

    // 计算当前时间和参数时间之间的时间范围
    const startOfTime = specifiedTime.startOf("day");
    const endOfTime = moment();

    // 构建查询条件
    const query = {};
    if (content) {
      query.content = { $regex: content, $options: "i" }; // 使用正则表达式进行模糊匹配，忽略大小写
    }
    if (type) {
      query.type = type;
    }
    if (time) {
      query.time = {
        $gte: startOfTime.format("YYYY/MM/DD HH:mm:ss"),
        $lte: endOfTime.format("YYYY/MM/DD HH:mm:ss"),
      };
    }
    console.log(query);
    return PostModel.find(query);
  },
};

module.exports = PostService;
