const SportRecordModel = require("../model/SportRecordModel");

const SportRecordService = {
  addSportRecord: (user_id, record_content) => {
    return SportRecordModel.create({
      user_id,
      record_content,
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
  updateSportRecord: (user_id, record_content) => {
    return SportRecordModel.updateOne(
      { user_id },
      {
        record_content,
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
    return SportRecordModel.find({ user_id: user_id });
  },
};

module.exports = SportRecordService;
