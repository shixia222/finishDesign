const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postureTypeSchema = new Schema({
  time: String,
  type:Boolean,
  neck:Boolean,
  uneven_shoulders:Boolean,
  rounded_shoulders:Boolean,
  thigh_protrusion:Boolean,
  legs:Boolean,
  knee:Boolean,
  calf:Boolean,
});

const postureSchema = new Schema({
  user_id: String,
  posture_content: [{ type: postureTypeSchema }],
});

const PostureModel = mongoose.model("posture", postureSchema);

module.exports = PostureModel;
