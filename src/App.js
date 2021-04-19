import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  const authenticated = localStorage.getItem('isAuth') === 'true';
  const routing = useRoutes(routes(authenticated));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        {routing}
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
