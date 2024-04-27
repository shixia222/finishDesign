const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  openid: {
    type: String,
    required: true,
    unique: true, // 确保每个用户的 OpenID 在数据库中是唯一的
  },
  username: String,
  mobile: String,
  email: String,
  header: String,
  gender: String,
  city: String,
  age: String,
  weight: String,
  height: String,
  body_fat: String,
  introduce: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
