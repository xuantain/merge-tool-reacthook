import React from 'react';
import NewProduct from '~/frontend/components/Product/NewProduct';

const NewProductPage = () => {
  return <NewProduct />;
};

NewProductPage.getInitialProps = async context => {
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

export default NewProductPage;
