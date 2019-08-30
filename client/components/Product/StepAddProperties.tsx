import React, { useRef, useState } from 'react';
import { Theme, useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

// Colors
import lightGreen from '@material-ui/core/colors/lightGreen';

// Models
import { DESIGN, PATTERN, MUG, COLOR, SIZE, AMZ_APP_SHIRT } from "../../models/amz-shirt.strict.model";
import { AMZ_COLOR, AMZ_APP_COLOR, AMZ_DEPARTMENT, AMZ_SIZE_MAP, AMZ_APP_SIZE_MAP } from "../../models/amz-product.model";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    designImg: {
      width: theme.typography.pxToRem(100),
      height: theme.typography.pxToRem(100),
    },
    card: {
      marginLeft: 10,
      marginRight: 5,
      width: theme.typography.pxToRem(100),
      height: theme.typography.pxToRem(100),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedIcon: {
      display: 'none',
    },
    checked: {
      display: 'inline-block',
      position: 'absolute',
      top: 5,
      right: 5,
      background: lightGreen[500],
    },

    formFields: {
      flexGrow: 1,
      marginLeft: 10,
    },
    textField: {
      paddingRight: theme.spacing(1),
    },
  }),
);

const getCurrentDateWithFormat = () => {
  var date = new Date();
  return date.getFullYear() +
    ('0'+(date.getMonth()+1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) + '-' +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2) + '-' +
    ('0' + date.getMilliseconds()).slice(-2);
};

const getDefaultMockupInfos = (designName: string): AMZ_APP_SHIRT => {
  return {
    feed_product_type: 'shirt',
    item_sku: 'DLS-' + getCurrentDateWithFormat(),
    brand_name: 'Dilostyle',
    item_name: designName,
    item_type: 'music-fan-t-shirts',
    outer_material_type1: 'Cotton',
    color_name: 'Blue/Red',
    color_map: 'Blue/Red',
    department_name: 'womens',
    size_name: 'S/M/L/XL',
    size_map: 'Small/Medium/Large/X-Large',
    is_adult_product: 'False',
    standard_price: 19.99,
    quantity: 999,
    main_image_url: null,
    other_image_url1: null,
    parent_child: 'parent',
    parent_sku: null,
    relationship_type: 'Variation',
    variation_theme: 'sizecolor',
    product_description: 'Solid colors: 100% Cotton; Heather Grey: 90% Cotton, 10% Polyester; All Other Heathers: 50% Cotton, 50% Polyester',
    bullet_point1: 'Designed and printed in the USA',
    bullet_point2: '100% preshrunk ringspun cotton',
    bullet_point3: 'Double-needle stitched sleeves and bottom hem',
    bullet_point4: 'Taped neck and shoulders',
    generic_keywords: 'I dont give a Hufflefuck tshirt,Hufflefuck,huffle,gryffindor,gryffin,harry',
    fulfillment_latency: 6,
    merchant_shipping_group_name: 'Migrated Template AMZ',
  };
};

const FormFields = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { data } = props;
  const [ amzsize, setAmzsize ] = useState<string[]>(data.size_map.split('/'));
  const [ amzsizename, setAmzsizename ] = useState<string[]>(data.size_name.split('/'));
  const [ amzcolormap, setAmzcolormap ] = useState<string[]>(data.color_map.split('/'));
  const [ amzcolorname, setAmzcolorname ] = useState<string[]>(data.color_name.split('/'));

  const changeSize = (event: React.ChangeEvent<{ value: string[] }>) => {
    data.size = (event.target.value as string[]).join('/');
    setAmzsize(event.target.value as string[]);
  };

  const changeSizeName = (event: React.ChangeEvent<{ value: string[] }>) => {
    data.size_name = (event.target.value as string[]).join('/');
    setAmzsizename(event.target.value as string[]);
  };

  const changeColorMap = (event: React.ChangeEvent<{ value: string[] }>) => {
    data.color_map = (event.target.value as string[]).join('/');
    setAmzcolormap(event.target.value as string[]);
  };

  const changeColorName = (event: React.ChangeEvent<{ value: string[] }>) => {
    data.color_name = (event.target.value as string[]).join('/');
    setAmzcolorname(event.target.value as string[]);
  };

  const handleDeleteColorName = (colorname: string) => () => {
    setAmzcolorname(amzcolorname => amzcolorname.filter(value => value !== colorname));
  };

  const handleDeleteColorMap = (colormap: string) => () => {
    setAmzcolormap(amzcolormap => amzcolormap.filter(value => value !== colormap));
  };

  const handleDeleteSizeName = (sizename: string) => () => {
    setAmzsizename(amzsizename => amzsizename.filter(value => value !== sizename));
  };

  const handleDeleteSizeMap = (sizemap: string) => () => {
    setAmzsize(amzsize => amzsize.filter(value => value !== sizemap));
  };

  return (
    <form className={clsx(classes.formFields)} noValidate autoComplete="off">
      <Grid container>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-item_sku"
            label="Seller SKU"
            defaultValue={data.item_sku}
            placeholder={data.item_sku}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-feed_product_type"
            label="Product Type"
            defaultValue={data.feed_product_type}
            placeholder={data.feed_product_type}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-brand_name"
            label="Brand Name"
            defaultValue={data.brand_name}
            placeholder={data.brand_name}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-item_name"
            label="Product Name"
            defaultValue={data.item_name}
            placeholder={data.item_name}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-item_type"
            label="Item Type Keyword"
            defaultValue={data.item_type}
            placeholder={data.item_type}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-outer_material_type1"
            label="Outer Material Type"
            defaultValue={data.outer_material_type1}
            placeholder={data.outer_material_type1}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            select
            id="amz-field-department_name"
            label="Department"
            value={data.department_name}
            placeholder={data.department_name}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            // onChange={handleChange('currency')}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu,
            //   },
            // }}
          >
            {
              AMZ_DEPARTMENT.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))
            }
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-is_adult_product"
            label="Is Adult Product"
            defaultValue={data.is_adult_product}
            placeholder={data.is_adult_product}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel htmlFor="select-multiple-chip">Color</InputLabel>
            <Select
              id="amz-field-color_name"
              required
              multiple
              value={amzcolorname}
              onChange={changeColorName}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <>
                  {selected ? (selected as string[]).map(value => (
                      (value === 'Blue') ?
                        <Chip key={value} label={value} color="primary" onDelete={handleDeleteColorName} /> :
                        <Chip key={value} label={value} color="secondary" onDelete={handleDeleteColorName} />
                  )) : ''}
                </>
              )}
              MenuProps={MenuProps}
            >
              {AMZ_APP_COLOR.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel htmlFor="select-multiple-chip">Color Map</InputLabel>
            <Select
              id="amz-field-color_map"
              required
              multiple
              value={amzcolormap}
              onChange={changeColorMap}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <>
                  {selected ? (selected as string[]).map(value => (
                    (value === 'Blue') ?
                      <Chip key={value} label={value} color="primary" onDelete={handleDeleteColorMap(value)} /> :
                      <Chip key={value} label={value} color="secondary" onDelete={handleDeleteColorMap(value)} />
                  )) : ''}
                </>
              )}
              MenuProps={MenuProps}
            >
              {AMZ_COLOR.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel htmlFor="select-multiple-chip">Size</InputLabel>
            <Select
              id="amz-field-size_name"
              required
              multiple
              value={amzsizename}
              onChange={changeSizeName}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <>
                  {selected ? (selected as string[]).map(value => (
                      <Chip key={value} label={value} onDelete={handleDeleteSizeName(value)} />
                  )) : ''}
                </>
              )}
              MenuProps={MenuProps}
            >
              {
                AMZ_APP_SIZE_MAP.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel htmlFor="select-multiple-chip">Size Map</InputLabel>
            <Select
              id="amz-field-size_map"
              required
              multiple
              value={amzsize}
              onChange={changeSize}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <>
                  {selected ? (selected as string[]).map(value => (
                      <Chip key={value} label={value} onDelete={handleDeleteSizeMap(value)} />
                  )) : ''}
                </>
              )}
              MenuProps={MenuProps}
            >
              {
                AMZ_SIZE_MAP.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            type="number"
            id="amz-field-standard_price"
            label="Standard Price"
            defaultValue={data.standard_price}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            type="number"
            id="amz-field-quantity"
            label="Quantity"
            defaultValue={data.quantity}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-main_image_url"
            label="Main Image URL"
            defaultValue={data.main_image_url}
            placeholder={data.main_image_url}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-other_image_url1"
            label="Other Image URL1"
            defaultValue={data.other_image_url1}
            placeholder={data.other_image_url1}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-relationship_type"
            label="Relationship Type"
            defaultValue={data.relationship_type}
            placeholder={data.relationship_type}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-variation_theme"
            label="Variation Theme"
            defaultValue={data.variation_theme}
            placeholder={data.variation_theme}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-product_description"
            label="Product Description"
            defaultValue={data.product_description}
            placeholder={data.product_description}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-bullet_point1"
            label="Key Product Features"
            defaultValue={data.bullet_point1}
            placeholder={data.bullet_point1}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-bullet_point2"
            label="Key Product Features"
            defaultValue={data.bullet_point2}
            placeholder={data.bullet_point2}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-bullet_point3"
            label="Key Product Features"
            defaultValue={data.bullet_point3}
            placeholder={data.bullet_point3}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-bullet_point4"
            label="Key Product Features"
            defaultValue={data.bullet_point4}
            placeholder={data.bullet_point4}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-generic_keywords"
            label="Search Terms"
            defaultValue={data.generic_keywords}
            placeholder={data.generic_keywords}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            type="number"
            id="amz-field-fulfillment_latency"
            label="Handling Time"
            defaultValue={data.fulfillment_latency}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            id="amz-field-merchant_shipping_group_name"
            label="Shipping-Template"
            defaultValue={data.merchant_shipping_group_name}
            placeholder={data.merchant_shipping_group_name}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

const PatternMockupList = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designName, patternFiles, mockups, setMockups, currentMockups, setCurrentMockups } = props;

  const usePattern = (patternName: string) => {

    const wasAdded = currentMockups[designName] && currentMockups[designName].patterns.includes(patternName);

    if (wasAdded) {

      setCurrentMockups((currentMockups: any) => {
        const idx = currentMockups[designName].patterns.indexOf(patternName);
        const newPatterns = currentMockups[designName] ? currentMockups[designName].patterns : [];

        newPatterns.splice(idx, 1);
        currentMockups[designName].patterns = newPatterns;

        return currentMockups;
      });

      setMockups((mockups: any) => {
        const newMockups = mockups.filter((tmpMockup: any, index: number) => {
          return (tmpMockup.designName === designName) && (tmpMockup.patternName !== patternName);
        });

        return newMockups;
      });
    }
    else {
      setCurrentMockups((currentMockups: any) => {
        currentMockups[designName] = currentMockups[designName] || { patterns: [], data: {} };
        const newPatterns = currentMockups[designName] ? [...currentMockups[designName].patterns, patternName] : [patternName];

        currentMockups[designName].patterns = newPatterns;
        currentMockups[designName].data = getDefaultMockupInfos(designName);

        return currentMockups;
      });

      const newMockup = {
        'designName': designName,
        'patternName': patternName,
        'data': getDefaultMockupInfos(designName),
      };
      setMockups([...mockups, newMockup]);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={3} lg={2}>
        {
          patternFiles.map((pattern: any, index: number) => (
            <Card className={classes.card} key={'patternItem-' + index}>
              <CardActionArea>
                <CardMedia
                  className={classes.designImg}
                  image={pattern.imagePreviewUrl}
                  title={pattern.fileName}
                  onClick={() => { usePattern(pattern.fileName) }}
                />
                <CheckIcon className={clsx(classes.checkedIcon, { [classes.checked]: currentMockups[designName] && currentMockups[designName].patterns.includes(pattern.fileName) })} />
              </CardActionArea>
            </Card>
          ))
        }
        </Grid>
        <Grid item xs={12} sm={9} lg={10}>
          {
            currentMockups[designName] && currentMockups[designName].data ?
              <FormFields data={currentMockups[designName].data || {}} /> : ''
          }
        </Grid>
      </Grid>
    </>
  );
}

const StepAddProperties = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designFiles, patternFiles, mockups, setMockups, currentMockups, setCurrentMockups } = props;

  return (
    <div className={classes.root}>
      {
        designFiles.map((design: any, index: number) => {
          return (
            <ExpansionPanel key={'designItem-' + index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"designItem-content-" + index}
                id={"designItem-header-" + index}
              >
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.designImg}
                      image={design.imagePreviewUrl}
                      title={design.fileName}
                    />
                  </CardActionArea>
                </Card>
                <Typography className={classes.heading}>Design name: {design.fileName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <PatternMockupList
                  designName={design.fileName} patternFiles={patternFiles}
                  mockups={mockups} setMockups={setMockups}
                  currentMockups={currentMockups} setCurrentMockups={setCurrentMockups}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
}

export default StepAddProperties;
