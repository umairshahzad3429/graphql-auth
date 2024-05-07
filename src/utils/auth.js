const validator = require("validator");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const validateSignUpInput = (name, email, password, age, number) => {
  const errors = {};
  if (!name) {
    errors.name = "Name must not be empty";
  }

  if (!email) {
    errors.email = "Email must not be empty";
  }
  if (email && !validator.isEmail(email)) {
    errors.email = "Email is not valid";
  }
  if (!password) {
    errors.password = "Password must not be empty";
  }
  if (!age) {
    errors.age = "Age must not be empty";
  }
  if (!number) {
    errors.number = "Number must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateLoginInput = (email, password) => {
  const errors = {};
  if (!email) {
    errors.email = "Email must not be empty";
  }
  if (!password) {
    errors.password = "Password must not be empty";
  }
  if (email && !validator.isEmail(email)) {
    errors.email = "Email must be a valid email address";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { generateToken, validateSignUpInput, validateLoginInput };
