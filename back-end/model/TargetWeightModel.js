const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TargetWeightSchema = new Schema({
  user_id: String,
  targetWeight: String,
});

const targetWeightModel = mongoose.model("targetWeight", TargetWeightSchema);

module.exports = targetWeightModel;
