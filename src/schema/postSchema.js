const postTypeDefs = /* GraphQL */ `
  type Post {
    id: ID!
    userId: ID!
    title: String!
    description: String!
  }

  input PostInput {
    title: String!
    description: String!
  }

  type Query {
    greetWorld: String!
  }

  type Mutation {
    createPost(postInput: PostInput): Post!
  }
`;
module.exports = { postTypeDefs };
