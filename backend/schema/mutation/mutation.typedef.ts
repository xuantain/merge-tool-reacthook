import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type Mutation {
    _empty: String
  }
`;
