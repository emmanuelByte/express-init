const { Schema, default: mongoose } = require("mongoose");

const todoSchema = new Schema({
  text: {
    type: String,
  },
  status: {
    type: String,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
