const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const planTypeSchema = new Schema({
  day: String,
  plan: [{ type: String }],
});

const planSchema = new Schema({
  user_id: String,
  plan_content: [{ type: planTypeSchema }],
});

const planModel = mongoose.model("plan", planSchema);

module.exports = planModel;
