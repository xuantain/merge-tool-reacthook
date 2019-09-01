import React, { useState } from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Order } from '../DataTable/DataInterface';

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

import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';
import SyncIcon from '@material-ui/icons/Sync';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import ContentCopyIcon from '@material-ui/icons/FileCopy';
import SyncProblem from '@material-ui/icons/SyncProblem';

// Components
import Layout from '../Layout/Layout';
import DashboardTableToolbar from './DashboardTableToolbar';
import DashboardTableHead from './DashboardTableHead';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import cyan from '@material-ui/core/colors/cyan';

import services from '../../services';
import utils from '../../utils';
import XLSX from 'xlsx';

// Models
import { DESIGN, MOCKUP, MUG, MUG_PATTERN, COLOR, SIZE, AMZ_APP_SHIRT, AMZ_DEFAULT_ROW, AMZ_FIELD_ORDER } from "../../models/amz-shirt.strict.model";


// import tShirt from '../../../assets/img/tshirt.webp';
// const demoImg = 'https://cdn.shopify.com/s/files/1/1312/0893/products/004.jpg?v=1491851162';
// const demoImg = tShirt;

type KeySortable = {
  sku: string;
  designName: string;
  patternName: string;
  mockupImage: string;
  status: string;
  createdAt: string;
}

type RowData = KeySortable & {
  mugPattern: MUG_PATTERN,
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof RowData;
  label: string;
  numeric: boolean;
}

const headRows: HeadRow[] = [
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'mockupImage', numeric: false, disablePadding: false, label: 'Image' },
  { id: 'designName', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'sku', numeric: false, disablePadding: false, label: 'SKU' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created at' },
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
      color: lightGreen[500],
    },
    bggreen: {
      backgroundColor: lightGreen[500],
    },
    bgblue: {
      backgroundColor: blue[500]
    },
    bgred: {
      backgroundColor: red[500]
    },
    bgcyan: {
      backgroundColor: cyan[500]
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
  const [ order, setOrder ] = useState<Order>('asc');
  const [ orderBy, setOrderBy ] = useState<keyof KeySortable>('sku');
  const [ page, setPage ] = useState(0);
  const [ dense, setDense ] = useState(true);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ designs, setDesigns ] = utils.useStateWithLocalStorage('designs', {});
  const [ mockups, setMockups ] = utils.useStateWithLocalStorage('mockups', []);
  const [ mugs ] = utils.useStateWithLocalStorage('mugs', {});
  const [ rows, setRows ] = useState<RowData[]>(loadData());
  const [ selectedMugPatterns, setSelectedMugPatterns ] = useState<MUG_PATTERN[]>([]);
  const [ emptyRows, setEmptyRows ] = useState(loadRowPerPage());


  function handleRequestSort(event: React.MouseEvent<unknown>, property: keyof KeySortable) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setEmptyRows(loadRowPerPage());
    setPage(0);
  }

  function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
    setDense(event.target.checked);
  }

  function selectAllMugPatterns(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = rows.map(row => { return row.mugPattern });
      setSelectedMugPatterns(newSelecteds);
      return;
    }

    setSelectedMugPatterns([]);
  }

  function selectMugPattern(event: React.MouseEvent<unknown>, rowData: RowData) {
    const row = rows.find(row => {
      return row.mugPattern.name === rowData.patternName && row.mugPattern.data.item_sku === rowData.sku;
    });
    const selectedIndex = selectedMugPatterns.indexOf(row.mugPattern);
    let newSelected: MUG_PATTERN[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedMugPatterns, row.mugPattern);
    }
    else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedMugPatterns.slice(1));
    }
    else if (selectedIndex === selectedMugPatterns.length - 1) {
      newSelected = newSelected.concat(selectedMugPatterns.slice(0, -1));
    }
    else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedMugPatterns.slice(0, selectedIndex),
        selectedMugPatterns.slice(selectedIndex + 1),
      );
    }

    setSelectedMugPatterns(newSelected);
  }

  function createData(design: DESIGN, mugPattern: MUG_PATTERN, mockup: MOCKUP, isUploadedError: boolean): RowData {

    const status = isUploadedError ? 'Pending' : 'Uploaded';
    const createdAt = new Date(mockup.addedAt).toISOString();

    const rowdata = {
      sku: mugPattern.data.item_sku,
      designName: design.name,
      patternName: mugPattern.name,
      mockupImage: mockup.sharedLink || design.src.toString(),
      status: status,
      createdAt: createdAt,
      mugPattern: mugPattern,
    };

    return rowdata;
  }

  function loadData() {
    let rowdata = [];

    for (const mugId in mugs) {
      const mug = mugs[mugId];

      if (!mug.recycledAt) {
        mug.patterns.map((mugPattern: MUG_PATTERN) => {
          if (mugPattern.colors.length) {
            const design: DESIGN = designs[mug.designName];
            const filterdMockups: MOCKUP[] = mockups.filter((mockup: MOCKUP) => {
              // Get all mockups belong to this mugPattern.
              if (mockup && (mockup.patternName === mugPattern.name) && (mockup.designName === mug.designName)) {
                return mockup;
              }
            });
            const isUploadedError = filterdMockups.some((mockup: MOCKUP) => {
              // If there is any mockup has not uploaded then it need to be resynced.
              return !mockup.sharedLink;
            });
            const mockup = filterdMockups.find((mockup: MOCKUP) => {
              // Get mockup info from the first mockup has uploaded.
              return !!mockup.sharedLink;
            });

            rowdata.push(createData(design, mugPattern, mockup, isUploadedError));
          }
        });
      }
    }

    return rowdata;
  }

  function loadRowPerPage() {
    return rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  }

  function recycleTheMugPattern (event: React.MouseEvent, sku: string) {
    event.preventDefault();
    event.stopPropagation();

    if (confirm('Do you want to recycle this mug-pattern "' + sku + '"?')) {
      const newMugPatterns = rows.filter((row: RowData) => {
        if (row.mugPattern.data.item_sku === sku) {
          row.mugPattern['recycledAt'] = Date.now();
        };
        return row.mugPattern;
      });

      console.log('recycleTheMugPattern, newList', newMugPatterns);

      // setMockups(newMugPatterns);
      setRows(loadData());
    }
  };

  function reSyncMockup(event: React.MouseEvent, row: RowData) {
    event.stopPropagation();

    const filterdMockups: MOCKUP[] = mockups.filter((mockup: MOCKUP) => {
      // Get all mockups belong to this mugPattern.
      return mockup && (mockup.patternName === row.patternName) && (mockup.designName === row.designName) && !mockup.sharedLink;
    });

    const promises = [];

    filterdMockups.map(mockup => {
      promises.push(uploadMockupToDropbox(mockup));
    });

    Promise.all(promises).then((res) => {

      // Update mockups store.
      let newMockups = [...mockups];

      res.map(info => {
        let mockupInfo = info.mockup;

        if (!info.error || (info.error.status === 409)) {
          newMockups.map((mockup: MOCKUP) => {
            if (mockup && (mockup.name === mockupInfo.name)) {
              mockupInfo.uploadedAt = Date.now();
              mockupInfo.sharedLink = info.sharedLink;
              mockupInfo.b64 = null;
            }
          });
        }
      });

      setMockups(newMockups);
      setRows(loadData());
    });
  };

  async function uploadMockupToDropbox (mockup: MOCKUP) : Promise<any> {
    const i = mockup.b64.toString().indexOf('base64,');
    const buffer = Buffer.from(mockup.b64.toString().slice(i + 7), 'base64');
    const uploadUrl = mockup.link || '/mockups/' + mockup.sku + '/' + mockup.name;

    return services.dropbox.filesUpload({path: uploadUrl, contents: buffer})
      .then(function (newFileInfo) {
        const settings = {
          'requested_visibility': {'.tag': 'public'} as DropboxTypes.sharing.RequestedVisibility,
          'audience': {'.tag': 'public'} as DropboxTypes.sharing.LinkAudiencePublic,
          'access': {'.tag': 'viewer'} as DropboxTypes.sharing.RequestedLinkAccessLevel,
        };

        return services.dropbox.sharingCreateSharedLinkWithSettings({path: newFileInfo.path_display, settings: settings})
          .then(function (sharedInfo) {
            return { mockup: mockup, sharedLink: sharedInfo.url };
          })
          .catch(function (error) {
            return { error: error, mockup: mockup, sharedLink: 'cannot get shared link "' + mockup.name + '"' };
          });
      })
      .catch(function (error) {
        return { error: error, mockup: mockup, sharedLink: 'cannot get shared link "' + mockup.name + '"' };
      });
  }

  function exportToExcel() {

    // NOTE: Adding 3 first rows for AMZ
    let exportedData = [ AMZ_DEFAULT_ROW ];

    const titles = AMZ_FIELD_ORDER.map(info => {
      return info[1];
    });

    const keys = AMZ_FIELD_ORDER.map(info => {
      return info[0];
    });

    exportedData.push(titles);
    exportedData.push(keys);

    // NOTE: Generate row data
    selectedMugPatterns.map((mugPattern: MUG_PATTERN) => {

      mugPattern.exportedAt = Date.now();

      let rowParent = {} as AMZ_APP_SHIRT;

      rowParent.feed_product_type = mugPattern.data.feed_product_type;
      rowParent.item_sku = mugPattern.data.item_sku;
      rowParent.brand_name = mugPattern.data.brand_name;
      rowParent.item_name = mugPattern.data.item_name;
      rowParent.department_name = mugPattern.data.department_name;
      rowParent.parent_child = 'parent';
      rowParent.variation_theme = mugPattern.data.variation_theme;

      // Add the Row parent
      const parentRowData = keys.map(key => {
        return rowParent[key];
      });

      exportedData.push(parentRowData);

      let count = 0;

      // NOTE: Generate Row child
      mugPattern.colors.map((color: COLOR, cidx: number) => {

        const mockup: MOCKUP = mockups.find((mockup: MOCKUP) => {
          return mockup.patternName === mugPattern.name && mockup.color.name === color.name;
        });

        if (mockup && !mockup.sharedLink && mockup.b64) {
          alert('ERROR: There are some Mockups were not uploaded yet, hence cannot getting mockups sharedLink to export to Excel file.');
          return;
        }

        // const sharedLink = mockup ? (mockup.sharedLink || mockup.b64 || 'async problem') : 'sharedLink';
        const sharedLink = mockup.sharedLink || mockup.b64;

        mugPattern.sizes.map((size: SIZE, sidx: number) => {

          count++;

          let rowChild = Object.assign({}, mugPattern.data);

          rowChild.parent_sku = rowParent.item_sku;
          rowChild.item_sku = rowParent.item_sku + '-' + count;
          rowChild.parent_child = 'child';
          rowChild.color_name = color.name;
          rowChild.color_map = color.amzColor;
          rowChild.size_name = size.appSize;
          rowChild.size_map = size.amzSize;
          rowChild.main_image_url = sharedLink.toString();

          const childRowData = keys.map(key => {
            return rowChild[key];
          });

          exportedData.push(childRowData);
        });
      });
    });

    // NOTE: Convert from array of arrays to workbook
    const worksheet = XLSX.utils.aoa_to_sheet(exportedData);
    const new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, 'amz-shirts');

    const exportFileName = 'amz-shirts-' + Date.now() + '.xlsx';
    XLSX.writeFile(new_workbook, exportFileName, { type:'base64', bookType: 'xlsx' });
  }

  const isSelected = (row: RowData) => selectedMugPatterns.findIndex(mugPattern => { return mugPattern.data.item_sku === row.sku}) !== -1;

  return (
    <Layout>
      <div className={classes.root}>
        <Box component="span" display="block" className={classes.buttonGroup}>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.bgcyan)} onClick={() => {}}>
            <SyncIcon className={classes.rightIcon} />
            Re-sync Error Products
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.bgred)} onClick={() => {}}>
            <DeleteIcon className={classes.rightIcon} />
            Recycle
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.bggreen)}
            onClick={() => {exportToExcel()}}>
            <GetApp className={classes.rightIcon} />
            Export
          </Button>
          <Button size="medium" variant="contained" color="primary" className={clsx(classes.button, classes.bgblue)}
            onClick={() => utils.link({path: '/newProduct'})}>
            <AddIcon className={classes.rightIcon} />
            New Product
          </Button>
        </Box>
        <Paper className={classes.paper}>
          <DashboardTableToolbar numSelected={selectedMugPatterns.length} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <DashboardTableHead
                numSelected={selectedMugPatterns.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={selectAllMugPatterns}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headRows={headRows}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: RowData, index: number) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `dashboard-table-checkbox-${index}`;
                    const itemkey = `${row.designName}-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => selectMugPattern(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={itemkey}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell>
                          {
                            (row.status === 'Uploaded') ?
                              <Typography id="productStatus" className={classes.green}>{row.status}</Typography>
                              :
                              <IconButton size="small" onClick={event => reSyncMockup(event, row)}>
                                <SyncProblem color="secondary" className={classes.chip} />
                              </IconButton>
                          }
                        </TableCell>
                        <TableCell>
                          <img src={row.mockupImage} alt={row.designName + row.patternName} className={classes.rowImg} />
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="none">
                          {row.designName}
                        </TableCell>
                        <TableCell>
                          {row.sku}
                        </TableCell>
                        <TableCell>
                          {row.createdAt}
                        </TableCell>
                        <TableCell align="right" id="actionGroups">
                          <IconButton size="small" className={classes.rightIcon} onClick={() => {}} >
                            <EditIcon color="primary"/>
                          </IconButton>
                          <IconButton size="small" className={classes.rightIcon}>
                            <SaveIcon color="primary" />
                          </IconButton>
                          <IconButton size="small" className={classes.rightIcon} onClick={(e) => {recycleTheMugPattern(e, row.sku)}}>
                            <DeleteIcon color="secondary" />
                          </IconButton>
                          <IconButton size="small" className={classes.rightIcon}>
                            <ContentCopyIcon color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )} */}
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
