import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Order } from '../common/OrderType';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Checkbox from '@material-ui/core/Checkbox';

interface Data {
  name: string;
  image: string;
  status: string;
  sku: string;
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headRows: HeadRow[] = [
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'image', numeric: true, disablePadding: false, label: 'Image' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'sku', numeric: false, disablePadding: false, label: 'SKU' },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
