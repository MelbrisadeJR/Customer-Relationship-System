import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {
    width: '100%',
    // maxWidth: 360,
  },
  inline: {
    display: 'inline',
  },
  image: {
    height: 48,
    width: 48
  },
  icon: {
    marginRight: 10,
  },
  subheader: {
    backgroundColor: '#F7F7F2',
    border: '1px solid #ffffff',
    lineHeight: '36px',
  }
}));

const data = [
  {
    id: '123',
    name: 'John Doe',
    subject: 'NEW PRODUCT A LAUNCHING',
    content: 'Hit sdfsdwersadf',
  },
  {
    id: '456',
    name: 'Cao Yu',
    subject: 'NEW PRODUCT A LAUNCHING',
    content: 'Hit sdfsdwersadf',
  },
  {
    id: '789',
    name: 'Carry M',
    subject: 'NEW PRODUCT A LAUNCHING',
    content: 'Hit sdfsdwersadf',
  }
];

const MailPreview = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={(
          <>
            <ListSubheader component="div" className={classes.subheader}>
              Theme Templates
            </ListSubheader>
            <Divider />
          </>
        )}
      >
        {data.map(({
          id, name, subject, content
        }, i) => (
          <ListItem
            alignItems="flex-start"
            divider={i < data.length - 1}
            key={id}
          >
            <ListItemText
              primary={name}
              secondary={(
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {subject}
                  </Typography>
                  {content}
                </>
              )}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

MailPreview.propTypes = {
  className: PropTypes.string
};

export default MailPreview;
