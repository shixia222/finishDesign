const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: String,
  content: String,
  user_id: String,
  username: String,
  userHeader: String,
  img: [{ type: String }],
  time: String,
  type: String,
});

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
