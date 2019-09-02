import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type Query {
    _empty: String
  }
`;
