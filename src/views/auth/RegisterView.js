import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
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

const RegisterView = () => {
  const classes = useStyles();
  // const navigate = useNavigate();

  const [user, setUser] = useState({
    email: 'daneezhao@gmail.com',
    password: 'danniz',
    policy: false,
  });

  const handleOnChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSignUp = async () => {
    // event.preventDefault();
    console.log('AHHH');
    const newUser = {
      username: user.email,
      email: user.email,
      password: user.password,
      confirmPassword: user.password
    };
    console.log('your verification code has been sent to your email, please login your email to check.');

    await UserService.registerUser(newUser);
    // navigate('/app/dashboard', { replace: true });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        className={classes.box}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: user.email,
              password: user.password,
              policy: user.policy
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(6).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={handleSignUp}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              // values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                  type="email"
                  value={user.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                  type="password"
                  value={user.password}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={user.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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
