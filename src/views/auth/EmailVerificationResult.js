import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import queryString from 'query-string';
import Page from 'src/components/Page';
import UserService from '../../services/users';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const EmailVerificationResult = () => {
  const classes = useStyles();
  const [message, setMessage] = useState([]);
  const { token } = queryString.parse(useLocation().search);

  const getVerificationRes = () => {
    UserService.getEmailVerified(token)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getVerificationRes();
  }, []);
  return (
    <Page
      className={classes.root}
      title="Email Verification"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Typography>
            {message}
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default EmailVerificationResult;
