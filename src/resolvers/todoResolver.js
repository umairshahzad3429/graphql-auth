const {
  fetchAllTodobyUser,
  createTodoService,
  updateTodoService,
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

    updateTodo: async (_, { id, todoInput }, context) => {
      const updatedTodo = updateTodoService(id, todoInput, context);
      return updatedTodo;
    },
  },
};

module.exports = { todoResolver };
