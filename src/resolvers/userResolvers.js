const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken, validateSignUpInput } = require("../utils/auth");

const userResolvers = {
  Query: {
    greet: () => "Hello World",
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
  },
};

module.exports = { userResolvers };
