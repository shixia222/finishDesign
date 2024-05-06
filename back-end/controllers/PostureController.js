const PostureService = require("../services/PostureService");

const PostureController = {
  addPosture: async (req, res) => {
    const { user_id, posture_content } = req.body;
    const isExistPosture = await PostureService.getDetails(user_id);
    if (isExistPosture !== null && isExistPosture.length == 0) {
      const result = await PostureService.addPosture(user_id, posture_content);
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    } else {
      let new_posture = [...isExistPosture[0].posture_content, posture_content];
      const result = await PostureService.updatePosture(
        user_id,
        new_posture
      );
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    }
  },
  getDetails: async (req, res) => {
    const { user_id } = req.body;
    const result = await PostureService.getDetails(user_id);
    res.send(result);
  },
};

module.exports = PostureController;
