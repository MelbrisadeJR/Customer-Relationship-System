import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles
} from '@material-ui/core';

import Logo from 'src/components/Logo';
import NavBar from './NavBar';
import RightNavBar from './RightNavBar';

const useStyles = makeStyles(() => ({
  root: {},
}));

const TopBar = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  // const [isRightNavOpen, setRightNavOpen] = useState(false);
  // const [isMainNavOpen, setMainNavOpen] = useState(false);

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
        <NavBar />
        <Box flexGrow={1} />
        <RightNavBar />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
