import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';

const TopBar = () => {
  return (
    <RouterLink to="/">
      <Logo />
    </RouterLink>
  );
};

export default TopBar;
