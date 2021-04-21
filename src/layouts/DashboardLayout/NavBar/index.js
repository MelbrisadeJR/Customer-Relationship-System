import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Tabs,
} from '@material-ui/core';

import NavItem from './NavItem';

const navItems = [
  {
    href: '/app/dashboard',
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    title: 'Customers'
  },
  {
    href: '/app/products',
    title: 'Products'
  },
  {
    href: '/app/orders',
    title: 'Orders'
  },
  {
    href: '/app/feedbacks',
    title: 'Feedbacks'
  }
];
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      p={2}
    >
      <List>
        {navItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Tabs>
        {navItems.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
          />
        ))}
      </Tabs>
      <Hidden lgUp>
        <Drawer
          anchor="top"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open={openMobile}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
