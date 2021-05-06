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
  },
  box: {
    backgroundColor: 'white',
    height: '700px',
    margin: '100px 100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
        className={classes.box}
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
