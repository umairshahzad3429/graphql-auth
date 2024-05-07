const { mergeResolvers } = require("@graphql-tools/merge");
const { userResolvers } = require("./userResolvers");
const { postResolvers } = require("./postResolvers");

const resolvers = [userResolvers, postResolvers];

module.exports = mergeResolvers(resolvers);
