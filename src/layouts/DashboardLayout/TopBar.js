import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Badge,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { User as AccountIcon } from 'react-feather';
import InputIcon from '@material-ui/icons/Input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Logo from 'src/components/Logo';
import NavBar from './NavBar';

const useStyles = makeStyles(() => ({
  root: {},
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <Box flexGrow={1} />
        <Toolbar>
          <Hidden mdDown>
            <IconButton color="white">
              <Badge
                badgeContent={notifications.length}
                color="white"
                variant="dot"
              >
                <RouterLink to="/app/emails">
                  <MailOutlineIcon htmlColor="white" />
                </RouterLink>
              </Badge>
            </IconButton>
            <IconButton>
              <RouterLink to="/app/account">
                <AccountIcon color="white" />
              </RouterLink>
            </IconButton>
            <IconButton color="inherit">
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              onClick={() => {
                setMobileNavOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
