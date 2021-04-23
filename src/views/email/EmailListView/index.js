import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MailCategory from './MailCategory';
import MailPreview from './MailPreview';
import MailContent from './MailContent';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxWidth: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MailGroup = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="MelbrisadeCRM - Email"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            md={3}
            xl={3}
            xs={12}
          >
            <MailCategory />
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            xl={3}
            xs={12}
          >
            <MailPreview />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={6}
            xs={12}
          >
            <MailContent />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default MailGroup;
