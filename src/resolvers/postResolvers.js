const { UserInputError } = require("apollo-server-express");
const { authMiddleware } = require("../utils/authMiddleware");
const Post = require("../models/Post");

const postResolvers = {
  Query: {
    greetWorld: () => "Hello",
  },
  Mutation: {
    createPost: async (_, { postInput }, context) => {
      const user = authMiddleware(context);
      const { title, description } = postInput || {};

      const errors = {};
      let valid = true;
      if (!title) {
        errors.title = "Title is required";
      } else if (!description) {
        errors.description = "Description is required";
      }

      valid = Object.keys(errors).length < 1;

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const newPost = new Post({
        userId: user.id,
        title,
        description,
      });

      const res = await newPost.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};

module.exports = { postResolvers };
