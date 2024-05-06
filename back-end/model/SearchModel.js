const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const screenTypeSchema = new Schema({
  content: String,
  type: String,
  time: String,
});

const SearchSchema = new Schema({
  user_id: String,
  search_content: [{ type: screenTypeSchema }],
});

const SearchModel = mongoose.model("search", SearchSchema);

module.exports = SearchModel;
