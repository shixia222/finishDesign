const PostureModel = require("../model/PostureModel");

const PostureService = {
  addPosture: (user_id, posture_content) => {
    return PostureModel.create({
      user_id,
      posture_content,
    })
      .then((res) => {
        const { _id } = res;
        return {
          success: true,
        };
      })
      .catch((err) => {
        return err;
      });
  },
  updatePosture: (user_id, posture_content) => {
    return PostureModel.updateOne(
      { user_id },
      {
        posture_content,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {

        return "failed";
      }
    });
  },
  getDetails: (user_id) => {
    return PostureModel.find({ user_id: user_id });
  },
};

module.exports = PostureService;
