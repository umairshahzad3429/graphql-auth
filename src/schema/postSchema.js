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
    getPosts: [Post]!
  }

  type Mutation {
    createPost(postInput: PostInput): Post!
    updatePost(id: ID!, postInput: PostInput): Post!
    deletePost(id: ID!): Boolean
  }
`;
module.exports = { postTypeDefs };
