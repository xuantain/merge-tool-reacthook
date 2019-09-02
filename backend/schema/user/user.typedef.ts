import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type User {
    id: ID!
    username: String
    posts(take: Int, skip: Int): [Post]
  }

  input UserInput {
    username: String!
    password: String!
  }

  extend type Mutation {
    signUpToGetToken(input: UserInput): String
    signInToGetToken(input: UserInput): String
  }

  extend type Query {
    user(id: ID!): User
  }
`;
