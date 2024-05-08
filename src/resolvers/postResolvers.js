const { UserInputError } = require("apollo-server-express");
const { authMiddleware } = require("../utils/authMiddleware");
const Post = require("../models/Post");

const postResolvers = {
  Query: {
    getPosts: async (_, __, context) => {
      const user = authMiddleware(context);
      const allPosts = await Post.find({ userId: user.id });
      return allPosts;
    },
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

    updatePost: async (_, { id, postInput }, context) => {
      authMiddleware(context);
      const filterQuery = { _id: id };
      await Post.updateOne(filterQuery, postInput);
      const postData = await Post.findOne(filterQuery);
      return postData;
    },

    deletePost: async (_, { id }, context) => {
      authMiddleware(context);
      const filterQuery = { _id: id };
      await Post.deleteOne(filterQuery);
      return true;
    },
  },
};

module.exports = { postResolvers };
