const { mergeTypeDefs } = require("@graphql-tools/merge");
const { userTypeDefs } = require("./userSchema");
const { postTypeDefs } = require("./postSchema");

const types = [userTypeDefs, postTypeDefs];

module.exports = mergeTypeDefs(types);
