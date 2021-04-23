import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import { useLocation } from 'react-router-dom';
import {
  Button,
  Hidden,
  Menu,
  MenuItem,
  makeStyles,
  Tabs,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NavItem from './NavItem';

const navItems = [
  {
    href: '/app/dashboard',
    title: 'DASHBOARD'
  },
  {
    href: '/app/customers',
    title: 'CUSTOMERS'
  },
  {
    href: '/app/products',
    title: 'PRODUCTS'
  },
  {
    href: '/app/orders',
    title: 'ORDERS'
  },
  {
    href: '/app/feedbacks',
    title: 'FEEDBACKS'
  }
];

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #3867d6',
    backgroundColor: '#3867d6',
    width: '250px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
  },
}))(MenuItem);

const StyledButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    width: '250px',
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  // const location = useLocation();
  const [openMainMenu, setOpenMainMenu] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(navItems[0].title);

  // useEffect(() => {
  //   if (!openMainMenu) {
  //     onRightNavClose();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.pathname]);

  return (
    <>
      <Hidden smDown>
        <Tabs>
          {navItems.map(({ href, title }) => (
            <NavItem
              href={href}
              key={title}
              title={title}
              onClick={() => setCurrentMenu(title)}
            />
          ))}
        </Tabs>
      </Hidden>
      <Hidden mdUp>
        <StyledButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(event) => {
            setOpenMainMenu(true);
            setAnchorEl(event.currentTarget);
          }}
        >
          {currentMenu}
          <ArrowDropDownIcon />
        </StyledButton>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openMainMenu}
          onClose={() => {
            setOpenMainMenu(false);
            setAnchorEl(null);
          }}
        >
          {navItems.map(({ href, title }) => (
            <StyledMenuItem
              onClick={() => {
                setOpenMainMenu(false);
                setCurrentMenu(title);
              }}
              href={href}
              key={title}
              title={title}
            >
              <RouterLink to={href}>
                <span className={classes.title}>
                  {title}
                </span>
              </RouterLink>
            </StyledMenuItem>
          ))}
        </StyledMenu>
      </Hidden>
    </>
  );
};

export default NavBar;
