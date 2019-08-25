import React from 'react';
import Designs from '../components/Designs/Designs';
import { ProductSortKeys } from '../models';

interface Props {
  query: {
    query: string;
    reverse: boolean;
    sortKey: ProductSortKeys;
    sortIndex: number;
  };
}

const DesignsPage = ({ query }: Props) => {
  return <Designs query={query} />;
}

DesignsPage.getInitialProps = async context => {
  const { store } = context;
  const { query, sortKey, sortIndex, reverse } = context.query;

  const transformedQuery = {
    query: query || '',
    // sortKey: sortKey ? sortKey.toUpperCase() : ProductSortKeys.BestSelling,
    sortIndex: sortIndex ? parseInt(sortIndex) : 0,
    reverse: reverse === 'true' ? true : false
  };

  // if (isServer) {
  //   await store.dispatch(services.products.getFirstPage(transformedQuery));
  // } else {
  //   store.dispatch(services.products.getFirstPage(transformedQuery));
  // }

  return { query: transformedQuery };
};

export default DesignsPage;
