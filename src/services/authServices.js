const { UserInputError } = require("apollo-server-express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateSignUpInput,
  validateLoginInput,
  generateToken,
} = require("../utils/auth");

const signUpService = async (name, email, password, age, number) => {
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

  return { res, token };
};

const loginService = async (email, password) => {
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
  return { user, token };
};

module.exports = { signUpService, loginService };
