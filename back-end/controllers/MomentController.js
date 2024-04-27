const MomentService = require("../services/MomentService");

const MomentController = {
  addMoment: async (req, res) => {
    const { user_id, moment_content } = req.body;
    const result = await MomentService.addMoment(user_id, moment_content);
    // if (result.success) {
    //   res.send({
    //     data: result.data,
    //     success: true,
    //   });
    // } else {
    //   res.send({ success: false, reason: result.message });
    // }
  },
  updateMoment: async (req, res) => {
    const { user_id, moment_content } = req.body;
    const result = await MomentService.updateMoment(user_id, moment_content);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getMomentByPostId: async (req, res) => {
    const { user_id, post_id } = req.body;
    const result = await MomentService.getMomentByPostId(user_id, post_id);
    res.send(result);
  },
  deleteMomentByPostId: async (req, res) => {
    const { user_id, post_id } = req.body;
    const result = await MomentService.deleteMomentByPostId(user_id, post_id);
    if (result == "success") {
      res.send({
        success: true,
      });
    } else {
      res.send({ success: false });
    }
  },
  getDetails: async (req, res) => {
    const { user_id } = req.body;
    const result = await MomentService.getDetails(user_id);
    res.send(result);
  },
};

module.exports = MomentController;
