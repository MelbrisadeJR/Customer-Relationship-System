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
  const [rows, setRows] = useState([]);

  const retrieveRows = () => {
    FeedbackService.getAll()
      .then((response) => {
        setRows(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveRows();
  }, []);

  const addAFeedback = function(product, starValue, description) {
    alert('Create a new feedback');
  };

  const deleteFeedbacks = () => {
    alert('Delete feedbacks');
  };

  return (
    <Page
      className={classes.root}
      title="Feedbacks"
    >
      <Container maxWidth={false}>
        <Toolbar addAFeedback={addAFeedback} />
        <Box mt={3}>
          <Results rows={rows} deleteFeedbacks={deleteFeedbacks} />
        </Box>
      </Container>
    </Page>
  );
};

export default FeedbackListView;
