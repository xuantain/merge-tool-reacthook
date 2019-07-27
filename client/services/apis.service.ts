import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import 'isomorphic-unfetch';
const apolloConfig = require('../../apollo.config');

export const shopify = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: apolloConfig.client.service.url,
    headers: apolloConfig.client.service.headers
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});
