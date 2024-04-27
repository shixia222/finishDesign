const TargetWeightModel = require("../model/TargetWeightModel");

const TargetWeightService = {
  addTargetWeight: (openid, targetWeight) => {
    return TargetWeightModel.create({
      user_id: openid,
      targetWeight,
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
  updateTargetWeight: (openid, targetWeight) => {
    return TargetWeightModel.updateOne(
      { openid },
      {
        targetWeight,
      }
    ).then((res) => {
      if (res.acknowledged) {
        return "success";
      } else {
        return "failed";
      }
    });
  },
  getDetails: (openid) => {
    return TargetWeightModel.find({ user_id: openid });
  },
};

module.exports = TargetWeightService;
