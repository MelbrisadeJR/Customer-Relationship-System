import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      height="50px"
      src="/static/logo.png"
      {...props}
    />
  );
};

export default Logo;
