import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField,
  // List,
  // ListItem,
  // ListItemText,
  // ListSubheader,
  makeStyles,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// const receivers = [
//   {
//     name: 'Danni Zhao',
//     email: 'daneezhao@gmail.com',
//     label: 'VIP'
//   },
//   {
//     name: 'John Doe',
//     email: 'johndoe@gmail.com',
//     label: 'New Customer'
//   },
//   {
//     name: 'Leo M',
//     email: 'leom@gmail.com',
//     label: 'Discount95'
//   }
// ];

const useStyles = makeStyles(({
  root: {
    width: '100%',
  },
  text: {
    // height: '500px',
  }
}));

const StyledTextField = withStyles({
  root: {
    width: '100%',
    marginBottom: '36px',
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    marginRight: '25px',
  },
})(Button);

const MailContent = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.io',
    subject: 'welcome',
    content: 'sdfsdf',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader />
        <Divider />
        <CardContent>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            To
          </Typography>
          <StyledTextField
            required
            id="outlined-required"
            // label="Required"
            name="receiverEmails"
            onChange={handleChange}
            value={values.email}
            variant="outlined"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            Subject
          </Typography>
          <StyledTextField
            required
            id="outlined-required"
            // label="Required"
            name="subject"
            onChange={handleChange}
            value={values.subject}
            variant="outlined"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            Content
          </Typography>
          <StyledTextField
            required
            id="outlined-required"
            name="content"
            multiline
            className={classes.text}
            rows={12}
            onChange={handleChange}
            value={values.content}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <StyledButton
            color="primary"
            variant="contained"
          >
            Save
          </StyledButton>
          <StyledButton
            color="secondary"
            variant="contained"
          >
            Send
          </StyledButton>
        </Box>
      </Card>
    </form>
  );
};

MailContent.propTypes = {
  className: PropTypes.string,
};

export default MailContent;
