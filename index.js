const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { applyMiddleware } = require("graphql-middleware");
require("dotenv").config();

const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./src/resolvers/index");
const typeDefs = require("./src/schema/index");

const app = express();

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB CONNECTED SUCCESSFULLY!"))
  .catch((err) => console.error(err));

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schema);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
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
