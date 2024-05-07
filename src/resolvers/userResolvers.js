const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  generateToken,
  validateSignUpInput,
  validateLoginInput,
} = require("../utils/auth");
const { authMiddleware } = require("../utils/authMiddleware");

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

      const { valid, errors } = validateSignUpInput(
        name,
        email,
        password,
        age,
        number
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const hashPass = await bcrypt.hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: hashPass,
        age,
        number,
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};

module.exports = { userResolvers };
