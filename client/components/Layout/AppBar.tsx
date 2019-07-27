import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import MoreIcon from '@material-ui/icons/MoreVert';
import Box from '@material-ui/core/Box';
import utils from '../../utils';
import SettingsIcon from '@material-ui/icons/Settings';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'block',
    cursor: 'pointer'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

function PrimaryAppBar() {
  const totalQuantity: number = useSelector(({ checkout }) => {
    let totalQuantity = 0;

    if (checkout.data) {
      totalQuantity = checkout.data.lineItems.edges.reduce((total, lineItem) => {
        return total + lineItem.node.quantity;
      }, 0);
    }

    return totalQuantity;
  });

  const theme = useTheme();
  const classes = useStyles(theme);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => utils.link({ path: '/' })}>Home</MenuItem>
      <MenuItem onClick={() => utils.link({ path: '/products' })}>Products</MenuItem>
      <MenuItem onClick={() => utils.link({ path: '/products' })}>Products</MenuItem>
      <MenuItem onClick={() => utils.link({ path: '/products' })}>Products</MenuItem>
      <MenuItem onClick={() => utils.link({ path: '/products' })}>Products</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Shirts" icon={<ShoppingBasket />} {...a11yProps(0)} onClick={() => utils.link({ path: '/' })} />
          <Tab label="Mugs" icon={<ShoppingBasket />} {...a11yProps(1)} onClick={() => utils.link({ path: '/products' })} />
          <Tab label="Groups" icon={<GroupWorkIcon />} {...a11yProps(2)} onClick={() => utils.link({ path: '/products' })} />
          <Tab label="Mockup" icon={<CameraAltIcon />} {...a11yProps(3)} onClick={() => utils.link({ path: '/products' })} />
          <Tab label="Settings" icon={<SettingsIcon />} {...a11yProps(4)} onClick={() => utils.link({ path: '/products' })} />
        </Tabs>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default PrimaryAppBar;
