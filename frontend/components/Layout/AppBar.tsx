import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { utils } from '../../utils';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import CollectionsIcon from '@material-ui/icons/Collections';
import DashboardIcon from '@material-ui/icons/Dashboard';

function a11yProps(index: number) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
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

const PrimaryAppBar = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const router = useRouter();
  // const { pathname } = router.pathname;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [value, setValue] = React.useState(0);

  interface MenuItem {
    label: string;
    link: string;
    icon: React.ReactElement;
  }

  const appMenus: MenuItem[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      label: 'Designs',
      link: '/designs',
      icon: <CollectionsIcon />
    },
    {
      label: 'Patterns',
      link: '/patterns',
      icon: <GroupWorkIcon />
    },
    // {
    //   label: 'Mockups',
    //   link: '/mockups',
    //   icon: <CameraAltIcon/>
    // },
    {
      label: 'Settings',
      link: '/settings',
      icon: <SettingsIcon />
    }
  ];

  let pageIndex = appMenus.findIndex(menuitem => {
    if (router.asPath === '/') {
      return true;
    }

    return router.asPath.toString().indexOf(menuitem.link) > -1;
  });

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event: any) {
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
      {appMenus.map((menuItem, index) => (
        <MenuItem key={menuItem.label} {...a11yProps(index)} onClick={() => utils.link({ path: menuItem.link })}>
          {menuItem.label}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Tabs
          value={pageIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs"
        >
          {appMenus.map((menuItem, index) => (
            <Tab
              key={menuItem.label}
              label={menuItem.label}
              icon={menuItem.icon}
              {...a11yProps(index)}
              onClick={() => utils.link({ path: menuItem.link })}
            />
          ))}
        </Tabs>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default PrimaryAppBar;
