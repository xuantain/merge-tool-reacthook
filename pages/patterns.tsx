import React from 'react';
import Patterns from '~/frontend/components/Patterns/Patterns';
import { ProductSortKeys } from '~/frontend/types/shopify.type';

interface Props {
  query: {
    query: string;
    reverse: boolean;
    sortKey: ProductSortKeys;
    sortIndex: number;
  };
}

const PatternsPage = ({ query }: Props) => {
  return <Patterns query={query} />;
};

export default PatternsPage;
