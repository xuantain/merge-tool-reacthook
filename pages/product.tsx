import React from 'react';
import Product from '~/frontend/components/Product/Product';
import { services } from '~/frontend/services';
import isServer from 'detect-node';

const ProductPage = () => {
  return <Product />;
};

ProductPage.getInitialProps = async context => {
  const { store, query } = context;

  if (isServer) {
    await store.dispatch(services.product.get({ handle: query.handle }));
  } else {
    store.dispatch(services.product.get({ handle: query.handle }));
  }

  return {};
};

export default ProductPage;
