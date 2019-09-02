import React from 'react';
import Dashboard from '~/frontend/components/Dashboard/Dashboard';
import { services } from '~/frontend/services';
import isServer from 'detect-node';
import { ProductSortKeys } from '~/frontend/types/shopify.type';

interface Props {
  query: {
    query: string;
    reverse: boolean;
    sortKey: ProductSortKeys;
    sortIndex: number;
  };
}

const DashboardPage = ({ query }: Props) => {
  return <Dashboard />;
};

DashboardPage.getInitialProps = async context => {
  const { store } = context;
  const { query, sortKey, sortIndex, reverse } = context.query;

  const transformedQuery = {
    query: query || '',
    sortKey: sortKey ? sortKey.toUpperCase() : ProductSortKeys.BestSelling,
    sortIndex: sortIndex ? parseInt(sortIndex) : 0,
    reverse: reverse === 'true' ? true : false
  };

  if (isServer) {
    await store.dispatch(services.products.getFirstPage(transformedQuery));
  } else {
    store.dispatch(services.products.getFirstPage(transformedQuery));
  }

  return { query: transformedQuery };
};

export default DashboardPage;
