const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const replySchema = new Schema({
  post_id: String,
  user_id: String,
  content: String,
  time: String,
});

const replyModel = mongoose.model("reply", replySchema);

module.exports = replyModel;
