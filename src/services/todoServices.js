const { UserInputError } = require("apollo-server-express");
const Todo = require("../models/Todo");

const createTodoService = async (todoInput, context) => {
  const user = authMiddleware(context);
  const { title, description } = todoInput;
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

  const newTodo = new Todo({
    userId: user.id,
    title,
    description,
  });

  const res = await newTodo.save();
  return { res };
};

const updateTodoService = async (id, todoInput, context) => {
  authMiddleware(context);
  const { title, description } = todoInput;
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

  const filterQuery = { _id: id };
  await Todo.updateOne(filterQuery, todoInput);
  const TodoData = await Todo.findOne(filterQuery);
  return TodoData;
};

const fetchAllTodobyUser = async (context) => {
  const user = authMiddleware(context);
  const userTodo = await Todo.find({ userId: user.id });

  return userTodo;
};

module.exports = { createTodoService, fetchAllTodobyUser, updateTodoService };
