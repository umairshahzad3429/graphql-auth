const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    //   profileImage: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
