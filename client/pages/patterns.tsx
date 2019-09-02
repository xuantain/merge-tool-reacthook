import React from 'react';
import Patterns from '../components/Patterns/Patterns';
import { ProductSortKeys } from '../models';

interface Props {
  query: {
    query: string;
    reverse: boolean;
    sortKey: ProductSortKeys;
    sortIndex: number;
  };
}

const PatternsPage = ({ query }: Props) => {
  return <Patterns  query={query} />;
}

export default PatternsPage;
