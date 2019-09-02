import 'isomorphic-unfetch';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

export const shopify = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: 'https://graphql.myshopify.com/api/graphql',
    headers: {
      'X-Shopify-Storefront-Access-Token': 'dd4d4dc146542ba7763305d71d1b3d38'
    }
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
