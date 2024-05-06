const SportRecordService = require("../services/SportRecordService");

const SportRecordController = {
  addSportRecord: async (req, res) => {
    const { user_id, record_content } = req.body;
    const isExistSportRecord = await SportRecordService.getDetails(user_id);
    if (isExistSportRecord !== null && isExistSportRecord.length == 0) {
      const result = await SportRecordService.addSportRecord(
        user_id,
        record_content
      );
      if (result.success) {
        res.send({
          data: result.data,
          success: true,
        });
      } else {
        res.send({ success: false, reason: result.message });
      }
    } else {
      let new_sport_record = [
        ...isExistSportRecord[0].record_content,
        record_content,
      ];
      const result = await SportRecordService.updateSportRecord(
        user_id,
        new_sport_record
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
    const result = await SportRecordService.getDetails(user_id);
    res.send(result);
  },
};

module.exports = SportRecordController;
