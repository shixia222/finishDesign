const TargetWeightService = require("../services/TargetWeightService");

const TargetWeightController = {
  addTargetWeight: async (req, res) => {
    const { openid, targetWeight } = req.body;
    const result = await TargetWeightService.addTargetWeight(
      openid,
      targetWeight
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
  updateTargetWeight: async (req, res) => {
    const { openid, targetWeight } = req.body;
    const result = await TargetWeightService.updateTargetWeight(
      openid,
      targetWeight
    );
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getDetails: async (req, res) => {
    const { openid } = req.body;
    const result = await TargetWeightService.getDetails(openid);
    res.send(result);
  },
};

module.exports = TargetWeightController;
