const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  generateToken,
  validateSignUpInput,
  validateLoginInput,
} = require("../utils/auth");
const { authMiddleware } = require("../utils/authMiddleware");
const { signUpService, loginService } = require("../services/authServices");

const userResolvers = {
  Query: {
    getUserDetails: async (_, __, context) => {
      const user = authMiddleware(context);
      const userDetails = await User.findOne({ _id: user.id });
      return {
        ...userDetails._doc,
        id: userDetails._id,
      };
    },
  },

  Mutation: {
    async signUp(_, { signUpInput }) {
      const { name, email, password, age, number } = signUpInput || {};

      const { token, res } = await signUpService(
        name,
        email,
        password,
        age,
        number
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { email, password }) {
      const { token, user } = await loginService(email, password);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

module.exports = { userResolvers };
