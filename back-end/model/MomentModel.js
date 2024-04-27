const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const momentSchema = new Schema({
  user_id: String,
  moment_content: [
    {
      post_id: String,
      post_title: String,
    },
  ],
});

const momentModel = mongoose.model("moment", momentSchema);

module.exports = momentModel;
