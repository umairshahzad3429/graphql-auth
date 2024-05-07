const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userResolvers } = require("./src/resolvers/userResolvers");
const { userTypeDefs } = require("./src/schema/userSchema");
require("dotenv").config();

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB CONNECTED SUCCESSFULLY!"))
  .catch((err) => console.error(err));

// Combine type definitions
const typeDefs = `
${userTypeDefs}
`;

// Combine resolvers
const resolvers = {
  ...userResolvers,
};

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema: schema,
  context: ({ req }) => ({ req }),
  introspection: true,
  playground: true,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
