import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import FeedbackService from '../../../services/feedback';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const FeedbackListView = () => {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);
  const retrieveCustomers = () => {
    FeedbackService.getAll()
      .then((response) => {
        // const { customers } = response.data;
        // customers.map(customer => customer.date = customer.date.slice(0,10));
        setFeedbacks(response.data);
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
      title="Feedbacks"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results feedbacks={feedbacks} />
        </Box>
      </Container>
    </Page>
  );
};

export default FeedbackListView;
