const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordTypeSchema = new Schema({
  time: String,
  type:String,
  duration:String,
  consume:String,
  gap:String,
  race:String,
});

const sportRecordSchema = new Schema({
  user_id: String,
  record_content: [{ type: recordTypeSchema }],
});

const sportRecordModel = mongoose.model("sportRecord", sportRecordSchema);

module.exports = sportRecordModel;
