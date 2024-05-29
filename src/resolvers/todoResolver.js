const { UserInputError } = require("apollo-server-express");
const { authMiddleware } = require("../utils/authMiddleware");
const Post = require("../models/Post");
const { fetchAllPostsbyUser } = require("../services/postServices");
const {
  fetchAllTodobyUser,
  createTodoService,
} = require("../services/todoServices");

const todoResolver = {
  Query: {
    getTodosByUser: async (_, __, context) => {
      const data = await fetchAllTodobyUser(context);

      return { data };
    },
  },
  Mutation: {
    createTodo: async (_, { todoInput }, context) => {
      const { res } = await createTodoService(todoInput, context);

      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};

module.exports = { todoResolver };
