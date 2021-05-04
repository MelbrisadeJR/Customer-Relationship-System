import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {

  Hidden,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { User as AccountIcon } from 'react-feather';
import InputIcon from '@material-ui/icons/Input';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const rightNav = [
  {
    href: '/app/emails',
    title: 'Email',
    icon: MailOutlineIcon,
  },
  {
    href: '/app/account',
    title: 'Account',
    icon: AccountIcon,
  },
  {
    href: '/app/admin',
    title: 'Supervisor',
    icon: SupervisorAccountIcon,
  },
  {
    href: '/login',
    title: 'Logout',
    icon: InputIcon,
  },
];
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #3867d6',
    backgroundColor: '#3867d6',
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
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const RightNavBar = () => {
  // const classes = useStyles();
  // const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRightMenu, setRightNavOpen] = useState(false);

  // useEffect(() => {
  //   if (openRightNav && onRightNavClose) {
  //     onRightNavClose();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location.pathname]);

  return (
    <>
      <Hidden mdDown>
        {rightNav.map(({ href, icon: Icon, title }) => (
          <IconButton key={title}>
            <RouterLink to={href}>
              <Icon color="white" htmlColor="white" />
            </RouterLink>
          </IconButton>
        ))}
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={(event) => {
            setRightNavOpen(true);
            setAnchorEl(event.currentTarget);
          }}
        >
          <MenuIcon />
        </IconButton>
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openRightMenu}
          onClose={() => {
            setRightNavOpen(false);
            setAnchorEl(null);
          }}
        >
          {rightNav.map(({ href, title, icon: Icon }) => (
            <StyledMenuItem
              href={href}
              key={title}
              title={title}
              onClick={() => setRightNavOpen(false)}
            >
              <RouterLink to={href}>
                <Icon color="white" htmlColor="white" />
              </RouterLink>
            </StyledMenuItem>
          ))}
        </StyledMenu>
      </Hidden>
    </>
  );
};

RightNavBar.defaultProps = {
  onRightNavClose: () => {},
  openRightNav: false,
};

export default RightNavBar;
