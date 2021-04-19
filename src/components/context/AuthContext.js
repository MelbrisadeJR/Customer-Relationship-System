import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth') === 'true';

  const [authenticated, setAuthenticated] = useState(isAuth);

  useEffect(() => {
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);
  // const isAuthenticated = () => {
  //   // TODO check isAuth, expire date, jwt
  //   console.log(`isAuthenticated--${authState.isAuth === true}`);
  //   return authState.isAuth === true;
  // };

  // const setAuthInfo = (info) => {
  //   localStorage.setItem('isAuth', info.isAuth);
  //   localStorage.setItem('userInfo', JSON.stringify(info.userInfo));

  //   setAuthState(info);
  // };

  const logout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userInfo');
    // setAuthState({
    //   isAuth: false,
    //   userInfo: null,
    // });
    // history.push('/');
  };

  return (
    <Provider value={{
      authenticated, setAuthenticated, logout, a: 'Danni', b: 233
    }}
    >
      {children}
    </Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };
