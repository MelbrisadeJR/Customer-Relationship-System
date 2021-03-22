import React from 'react';
import {
  Box,
  Tabs
} from '@material-ui/core';

import NavItem from './NavItem';

const items = [
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

const NavBar = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexGrow="1"
    >
      <Box
        p={2}
        display="flex"
        flexDirection="row"
      >
        <Tabs>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default NavBar;
