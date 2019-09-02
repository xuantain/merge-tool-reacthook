import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  input PostInput {
    title: String!
    content: String
  }

  extend type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Boolean
  }

  extend type Query {
    post(id: ID!): Post
    posts(take: Int, skip: Int): [Post]
  }
`;
