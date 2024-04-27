const MomentModel = require("../model/MomentModel");

const MomentService = {
  addMoment: async (user_id, moment_content) => {
    return MomentModel.create({
      user_id,
      moment_content,
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
  updateMoment: (user_id, moment_content) => {
    return MomentModel.updateOne(
      { user_id },
      {
        moment_content,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getMomentByPostId: (user_id, post_id) => {
    return MomentModel.find({
      user_id: user_id,
      moment_content: {
        $elemMatch: {
          post_id: post_id,
        },
      },
    });
  },
  deleteMomentByPostId: (user_id, post_id) => {
    return MomentModel.updateOne(
      { user_id },
      { $pull: { moment_content: { post_id } } },
      { multi: true }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getDetails: (user_id) => {
    return MomentModel.find({ user_id: user_id });
  },
};

module.exports = MomentService;
