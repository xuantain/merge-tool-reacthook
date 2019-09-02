import React from 'react';
import Products from '~/frontend/components/Products/Products';
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

const ProductsPage = ({ query }: Props) => {
  return <Products query={query} />;
};

ProductsPage.getInitialProps = async context => {
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

export default ProductsPage;
