const todoTypeDefs = /* GraphQL */ `
  type Todo {
    id: ID!
    userId: ID!
    title: String!
    description: String!
    name: String!
    companyName: String!
  }

  input TodoInput {
    title: String!
    description: String!
  }

  type Query {
    getTodos: [Todo]!
    getTodosByUser(userId: ID!): [Todo]!
  }

  type Mutation {
    createTodo(TodoInput: TodoInput): Todo!
    updateTodo(id: ID!, TodoInput: TodoInput): Todo!
    deleteTodo(id: ID!): Boolean
  }
`;
module.exports = { todoTypeDefs };
