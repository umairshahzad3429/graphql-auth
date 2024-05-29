const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Todo title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Todo description is required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todo", todoSchema);
