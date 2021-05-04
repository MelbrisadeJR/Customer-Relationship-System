import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// eslint-disable-next-line import/extensions
import CustomerService from '../../../services/customer';

// import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);

  const retrieveCustomers = () => {
    CustomerService.getAll()
      .then((response) => {
        // const { customers } = response.data;
        // customers.map(customer => customer.date = customer.date.slice(0,10));
        setCustomers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveCustomers();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar
          customers={customers}
          setCustomers={setCustomers}
          retrieveCustomers={retrieveCustomers}
        />
        <Box mt={3}>
          <Results
            customers={customers}
            setCustomers={setCustomers}
            retrieveCustomers={retrieveCustomers}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
