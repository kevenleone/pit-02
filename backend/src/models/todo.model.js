const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: String,
    completed: {default: false, type: Boolean},
    userId: String,
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;
