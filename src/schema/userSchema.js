const userTypeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    number: String!
    token: String!
  }

  input SignUpInput {
    name: String!
    email: String!
    age: Int!
    number: String!
    password: String!
  }

  type Query {
    getUserDetails: User!
  }

  type Mutation {
    signUp(signUpInput: SignUpInput): User
    login(email: String!, password: String!): User
  }
`;
module.exports = { userTypeDefs };
