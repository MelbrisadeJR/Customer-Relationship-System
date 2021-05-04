import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="FoundPassword"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              fullname: '',
              adminnumber: '',
              password: '',
              newpassword: '',
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                fullname: Yup.string().max(255).required('Your Full Name is required'),
                adminnumber: Yup.string().max(255).required('Your Admin Number is required'),
                password: Yup.string().max(255).required('password is required'),
                newpassword: Yup.string().max(255).required('password is required'),
              })
            }
            onSubmit={() => {
              navigate('/app/adminlogin', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Forget Your Password?
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Please verify your Identity
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fullname && errors.fullname)}
                  fullWidth
                  helperText={touched.fullname && errors.fullname}
                  label="Full Name"
                  margin="normal"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.adminnumber && errors.adminnumber)}
                  fullWidth
                  helperText={touched.adminnumber && errors.adminnumber}
                  label="Admin Number"
                  margin="normal"
                  name="adminnumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.adminnumber}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="New Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.newpassword && errors.newpassword)}
                  fullWidth
                  helperText={touched.newpassword && errors.newpassword}
                  label="Confirm New Password"
                  margin="normal"
                  name="newpassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.newpassword}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Upload my password
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Link
                    component={RouterLink}
                    to="/app/adminlogin"
                    variant="h6"
                  >
                    Remembered Password.
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
