import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Order } from '../common/OrderType';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import GetApp from '@material-ui/icons/GetApp';
import SyncIcon from '@material-ui/icons/Sync';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ContentCopyIcon from '@material-ui/icons/FileCopy';

// Components
import Layout from '../Layout/Layout';
import DashboardTableToolbar from '../Products/DashboardTableToolbar';
import DashboardTableHead from '../Products/DashboardTableHead';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import cyan from '@material-ui/core/colors/cyan';

import tShirt from '../../../assets/img/tshirt.webp';
import utils from '../../utils';

interface Data {
  name: string;
  image: string;
  status: string;
  sku: string;
  createdAt: string;
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

function createData(
  name: string,
  image: string,
  status: string,
  sku: string,
  createdAt: string,
): Data {
  return { name, image, status, sku, createdAt };
}

// const demoImg = 'https://cdn.shopify.com/s/files/1/1312/0893/products/004.jpg?v=1491851162';
const demoImg = tShirt;

const headRows: HeadRow[] = [
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'image', numeric: false, disablePadding: false, label: 'Image' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'sku', numeric: false, disablePadding: false, label: 'SKU' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created at' },
];

const rows = [
  createData('Shirt 1', demoImg, 'Synced', 'Tee-20190729-001', '2019-07-01 14h:15m:31s'),
  createData('Shirt 2', demoImg, 'Synced', 'Tee-20190729-002', '2019-07-01 10h:36m:21s'),
  createData('Shirt 3', demoImg, 'Synced', 'Tee-20190729-003', '2019-07-01 14h:45m:15s'),
  createData('Shirt 4', demoImg, 'Synced', 'Tee-20190729-004', '2019-07-02 13h:35m:01s'),
  createData('Shirt 5', demoImg, 'Synced', 'Tee-20190729-005', '2019-07-02 17h:25m:31s'),
  createData('Shirt 6', demoImg, 'Synced', 'Tee-20190729-006', '2019-07-02 11h:35m:33s'),
  createData('Shirt 7', demoImg, 'Synced', 'Tee-20190729-007', '2019-07-02 18h:25m:31s'),
  createData('Shirt 8', demoImg, 'Synced', 'Tee-20190729-008', '2019-07-02 11h:55m:22s'),
  createData('Shirt 9', demoImg, 'Synced', 'Tee-20190729-009', '2019-07-03 19h:25m:39s'),
  createData('Shirt 10', demoImg, 'Synced', 'Tee-20190729-010', '2019-07-03 10h:15m:45s'),
  createData('Shirt 11', demoImg, 'Synced', 'Tee-20190729-011', '2019-07-03 10h:15m:34s'),
  createData('Shirt 12', demoImg, 'Synced', 'Tee-20190729-012', '2019-07-03 11h:15m:55s'),
];

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    button: {
      margin: theme.spacing(1),
    },
    buttonGroup: {
      direction: 'rtl'
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
    chip: {
      margin: theme.spacing(1),
    },
    green: {
      background: lightGreen[500],
    },
    blue: {
      background: blue[500]
    },
    red: {
      background: red[500]
    },
    cyan: {
      background: cyan[500]
    },
    modal: {
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      outline: 'none',
      padding: theme.spacing(1, 1, 1),
      left: `calc(10% - ${theme.spacing(1)})`,
      marginBottom: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    gridList: {
      width: 500,
      height: 450,
    },
    rowImg: {
      width: 70,
      height: 70,
    }
  }),
);

const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof Data) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event: React.MouseEvent<unknown>, name: string) {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    }
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    }
    else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    }
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
    setDense(event.target.checked);
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Layout>
      <div className={classes.root}>
        <Box component="span" display="block" className={classes.buttonGroup}>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.cyan)} onClick={() => {}}>
            <SyncIcon className={classes.rightIcon} />
            Re-sync Error Products
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.red)} onClick={() => {}}>
            <DeleteIcon className={classes.rightIcon} />
            Recycle
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.green)} onClick={() => {}}>
            <GetApp className={classes.rightIcon} />
            Export
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.blue)}
            onClick={() => utils.link({path: '/newProduct'})}>
            <AddIcon className={classes.rightIcon} />
            New Product
          </Button>
        </Box>
        <Paper className={classes.paper}>
          <DashboardTableToolbar numSelected={selected.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <DashboardTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headRows={headRows}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name.toString());
                    const labelId = `dashboard-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.name.toString())}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox" component="th">
                          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell component="th">
                          {/* <Chip label={row.status} color="primary" className={classes.chip} /> */}
                          <Typography id="productStatus" color={"primary"}>{row.status}</Typography>
                        </TableCell>
                        <TableCell>
                          <img src={row.image.toString()} alt={row.name.toString()} className={classes.rowImg} />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell component="th">
                          {row.sku}
                        </TableCell>
                        <TableCell component="th">
                          {row.createdAt}
                        </TableCell>
                        <TableCell align="right" component="th" id="actionGroups">
                          <EditIcon color="primary" className={classes.rightIcon} onClick={() => {}} />
                          <SaveIcon color="primary" className={classes.rightIcon} />
                          <DeleteIcon color="secondary" className={classes.rightIcon} />
                          <ContentCopyIcon color="primary" className={classes.rightIcon} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel label="Dense padding" control={<Switch checked={dense} onChange={handleChangeDense} />} />
      </div>
    </Layout>
  );
}

export default Dashboard;
