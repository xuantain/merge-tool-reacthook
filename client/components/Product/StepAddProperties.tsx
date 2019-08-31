import React, { useRef, useState } from 'react';
import { Theme, useTheme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

// Colors
import { lightGreen, red } from '@material-ui/core/colors';

// Models
import { DESIGN, PATTERN, MOCKUP, MUG, MUG_PATTERN, COLOR, SIZE, AMZ_APP_SHIRT } from "../../models/amz-shirt.strict.model";
import { AMZ_COLOR, AMZ_APP_COLOR, AMZ_DEPARTMENT, AMZ_SIZE_MAP, AMZ_APP_SIZE_MAP } from "../../models/amz-product.model";

import utils from '../../utils';


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

const APP_SIZES : SIZE[] = AMZ_APP_SIZE_MAP.map((size, index) => {
  return {
    appSize: size,
    amzSize: AMZ_SIZE_MAP[index],
  };
});

const createDefaultColor = (name?: string, hex?: string, amzColor?: string) : COLOR => {
  const newColor = {
    name: name,
    addedAt: Date.now(),
    hex: hex,
    amzColor: amzColor,
  } as COLOR;

  return newColor;
};

const APP_COLORS : COLOR[] = [
  createDefaultColor('Black', 'Black', 'Black'),
  createDefaultColor('Blue', 'Blue', 'Blue'),
  createDefaultColor('Red', 'Red', 'Red'),
];

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
    filledData: {
      backgroundColor: lightGreen[500],
    },
    chip: {
      margin: theme.spacing(1),
    },
    chipChecked: {
      background: lightGreen[500],
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
    color_name: null,
    color_map: null,
    department_name: 'womens',
    size_name: null,
    size_map: null,
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

const FormFields = (props: { designName: string, mugPattern: MUG_PATTERN, currentMugs: any, setCurrentMugs: Function}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designName, mugPattern, currentMugs, setCurrentMugs } = props;
  const [ colors, setColors ] = utils.useStateWithLocalStorage('colors', []);
  // const [ amzcolorname, setAmzcolorname ] = useState<COLOR[]>(mugPattern.colors);

  // const changeColorName = (event: React.ChangeEvent<{ value: string[] }>) => {
  //   mugPattern.data.color_name = (event.target.value as string[]).join('/');
  //   setAmzcolorname(event.target.value as string[]);
  // };

  // const handleDeleteColorName = (colorname: string) => () => {
  //   setAmzcolorname(amzcolorname => amzcolorname.filter(value => value !== colorname));
  // };

  const toggleColorToMug = (color: COLOR) => () => {
    const idx = mugPattern.colors.findIndex(colorItem => {return colorItem.hex === color.hex});

    if (idx === -1) {
      mugPattern.colors.push(color);
    } else {
      mugPattern.colors.slice(idx, 1);
    }

    setCurrentMugs(currentMugs => { return {...currentMugs} });
  };

  const toggleSizeToMug = (size: SIZE) => () => {
    const idx = mugPattern.sizes.findIndex(sizeItem => {return sizeItem.appSize === size.appSize});

    if (idx === -1) {
      mugPattern.sizes.push(size);
    } else {
      mugPattern.sizes.slice(idx, 1);
    }

    setCurrentMugs(currentMugs => { return {...currentMugs} });
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
            defaultValue={mugPattern.data.item_sku}
            placeholder={mugPattern.data.item_sku}
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
            defaultValue={mugPattern.data.feed_product_type}
            placeholder={mugPattern.data.feed_product_type}
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
            defaultValue={mugPattern.data.brand_name}
            placeholder={mugPattern.data.brand_name}
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
            defaultValue={mugPattern.data.item_name}
            placeholder={mugPattern.data.item_name}
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
            defaultValue={mugPattern.data.item_type}
            placeholder={mugPattern.data.item_type}
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
            defaultValue={mugPattern.data.outer_material_type1}
            placeholder={mugPattern.data.outer_material_type1}
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
            value={mugPattern.data.department_name}
            placeholder={mugPattern.data.department_name}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
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
            defaultValue={mugPattern.data.is_adult_product}
            placeholder={mugPattern.data.is_adult_product}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField} id="amz-field-color_name">
            <InputLabel htmlFor="select-multiple-chip">Color</InputLabel>
            <>
              {APP_COLORS.map(color => (
                  <Chip
                    key={'mugColor-' + designName + '-' + mugPattern + '-' + color.name}
                    label={color.name}
                    size="small"
                    onClick={toggleColorToMug(color)}
                    className={clsx(classes.chip, {
                        [classes.chipChecked]: mugPattern.colors.findIndex(mugColor => {return mugColor.hex === color.hex}) !== -1 }
                      )}
                    color="default"
                    // {
                    //   mugPattern.colors.find(mugColor => {return mugColor.hex === color.hex}).hex || ''
                    // }
                  />
              ))}
            </>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={4}>
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
        </Grid> */}
        <Grid item xs={12} sm={6} lg={4}>
          <FormControl fullWidth className={classes.textField}>
            <InputLabel htmlFor="select-multiple-chip">Size</InputLabel>
            <>
              {APP_SIZES.map(size => (
                  <Chip
                    key={'mugSize-' + designName + '-' + mugPattern.name + '-' + size.amzSize}
                    label={size.appSize}
                    size="small"
                    onClick={toggleSizeToMug(size)}
                    className={clsx(classes.chip, {
                        [classes.chipChecked]: mugPattern.sizes.findIndex(mugSize => {return mugSize.appSize === size.appSize}) !== -1 }
                      )}
                  />
              ))}
            </>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            required
            fullWidth
            type="number"
            id="amz-field-standard_price"
            label="Standard Price"
            defaultValue={mugPattern.data.standard_price}
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
            defaultValue={mugPattern.data.quantity}
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
            defaultValue={mugPattern.data.main_image_url}
            placeholder={mugPattern.data.main_image_url}
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
            defaultValue={mugPattern.data.other_image_url1}
            placeholder={mugPattern.data.other_image_url1}
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
            defaultValue={mugPattern.data.relationship_type}
            placeholder={mugPattern.data.relationship_type}
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
            defaultValue={mugPattern.data.variation_theme}
            placeholder={mugPattern.data.variation_theme}
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
            defaultValue={mugPattern.data.product_description}
            placeholder={mugPattern.data.product_description}
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
            defaultValue={mugPattern.data.bullet_point1}
            placeholder={mugPattern.data.bullet_point1}
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
            defaultValue={mugPattern.data.bullet_point2}
            placeholder={mugPattern.data.bullet_point2}
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
            defaultValue={mugPattern.data.bullet_point3}
            placeholder={mugPattern.data.bullet_point3}
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
            defaultValue={mugPattern.data.bullet_point4}
            placeholder={mugPattern.data.bullet_point4}
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
            defaultValue={mugPattern.data.generic_keywords}
            placeholder={mugPattern.data.generic_keywords}
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
            defaultValue={mugPattern.data.fulfillment_latency}
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
            defaultValue={mugPattern.data.merchant_shipping_group_name}
            placeholder={mugPattern.data.merchant_shipping_group_name}
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

const StepAddProperties = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { designs, patterns, currentDesigns, currentPatterns, mugs, setMugs, currentMugs, setCurrentMugs } = props;

  const addPatternToMug = (design: DESIGN, pattern: PATTERN) => {

    const wasAdded = currentMugs[design.name] && currentMugs[design.name].patterns.some((patternItem: MUG_PATTERN) => {
      return patternItem.name === pattern.name;// && patternItem.id === pattern.id;
    });

    if (wasAdded) {

      setCurrentMugs((currentMugs: { key: MUG }) => {
        const idx = currentMugs[design.name] && currentMugs[design.name].patterns.findIndex((patternItem: MUG_PATTERN) => {
          return patternItem.name === pattern.name;// && patternItem.id === pattern.id;
        });
        const newPatterns = currentMugs[design.name] ? currentMugs[design.name].patterns : [];

        (idx > -1) && newPatterns.splice(idx, 1);
        currentMugs[design.name].patterns = newPatterns;

        return {...currentMugs};
      });
    }
    else {

      const newMugPattern = {
        id: pattern.id, // TODO: async so still not get id yet
        name: pattern.name,
        colors: APP_COLORS,
        sizes: APP_SIZES.slice(0, 4),
        data: getDefaultMockupInfos(design.name),
      } as MUG_PATTERN;

      const newMug = {
        designId: design.id,
        designName: design.name,
        patterns: []
      } as MUG;

      setCurrentMugs((currentMugs: { key: MUG }) => {

        let currentMug = currentMugs[design.name] || newMug;
        const newPatterns = [...currentMug.patterns, newMugPattern];

        currentMug.patterns = newPatterns;

        return {...currentMugs, [design.name]: currentMug};
      });
    }

    const wasAddedToMugs = mugs[design.name] && mugs[design.name].patterns.some((patternItem: MUG_PATTERN) => {
      return patternItem.name === pattern.name;// && patternItem.id === pattern.id;
    });

    if (wasAddedToMugs) {

      setMugs((currentMugs: { key: MUG }) => {
        const idx = currentMugs[design.name] && currentMugs[design.name].patterns.findIndex((patternItem: MUG_PATTERN) => {
          return patternItem.name === pattern.name;// && patternItem.id === pattern.id;
        });
        const newPatterns = currentMugs[design.name] ? currentMugs[design.name].patterns : [];

        (idx > -1) && newPatterns.splice(idx, 1);
        currentMugs[design.name].patterns = newPatterns;

        return {...currentMugs};
      });
    } else {

      const newMugPattern = {
        id: pattern.id, // TODO: async so still not get id yet
        name: pattern.name,
        colors: APP_COLORS,
        sizes: APP_SIZES.slice(0, 4),
        data: getDefaultMockupInfos(design.name),
      } as MUG_PATTERN;

      const newMug = {
        designId: design.id,
        designName: design.name,
        patterns: []
      } as MUG;

      setMugs((currentMugs: { key: MUG }) => {

        let currentMug = currentMugs[design.name] || newMug;
        const newPatterns = [...currentMug.patterns, newMugPattern];

        currentMug.patterns = newPatterns;

        return {...currentMugs, [design.name]: currentMug};
      });
    }
  };

  return (
    <div className={classes.root}>
      {
        // NOTE: 1 Design will creates 1 Mug + relevant data (patterns + colors)
        Object.keys(currentDesigns).map((key: string, mugDesignIndex: number) => {
          const design: DESIGN = currentDesigns[key];
          return (
            <ExpansionPanel key={'designItem-' + mugDesignIndex}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"designItem-content-" + mugDesignIndex}
                id={"designItem-header-" + mugDesignIndex}
              >
                {/* Show Design Image & Info */}
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.designImg}
                      image={design.src.toString()}
                      title={design.name}
                    />
                  </CardActionArea>
                </Card>

                {/* Show Pattern Images to choose --> Create new Mug */}
                {Object.keys(currentPatterns).map((key: string, mugPatternIndex: number) => {
                  const pattern: PATTERN = currentPatterns[key];

                  return (
                    <Card className={classes.card} key={'mugPattern-' + mugDesignIndex + '-' + mugPatternIndex}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.designImg}
                          image={pattern.src.toString()}
                          onClick={() => { addPatternToMug(design, pattern) }}
                        />
                        <CheckIcon className={clsx(classes.checkedIcon, { [classes.checked]: currentMugs[design.name] && currentMugs[design.name].patterns.includes(pattern.name) })} />
                      </CardActionArea>
                    </Card>
                  )
                } )}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {
                  currentMugs && currentMugs[design.name] && currentMugs[design.name].patterns.map((mugPattern: MUG_PATTERN, mugPatternIndex: number) => (
                    <Grid container key={'mugPatternImage-'+ mugDesignIndex + '-' + mugPatternIndex}>
                      <Grid item xs={12} sm={3} lg={2}>
                        <Card className={classes.card}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.designImg}
                              // image={mugPattern.imagePreviewUrl}
                              title={mugPattern.name}
                            />
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={9} lg={10}>
                        <FormFields
                          designName={design.name} mugPattern={mugPattern}
                          currentMugs={currentMugs} setCurrentMugs={setCurrentMugs}
                        />
                      </Grid>
                    </Grid>
                  ))
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })
      }
    </div>
  );
}

export default StepAddProperties;
