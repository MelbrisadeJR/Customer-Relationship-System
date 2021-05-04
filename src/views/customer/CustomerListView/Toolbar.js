import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CustomerService from '../../../services/customer';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toolbar = ({
  className,
  customers,
  setCustomers,
  retrieveCustomers,
  ...rest
}) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const genderOption = ['male', 'female', 'other'];
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const addCustomer = () => {
    const newCustomer = {
      email,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      mobile,
      city,
      country,
      gender
    };
    if (email === '') {
      setErrorSnackbarOpen(true);
      console.log(newCustomer);
      setError('Please Enter Email Address!');
    }
    if (email !== '') {
      console.log(newCustomer);
      CustomerService.addCustomer(newCustomer);
      setDialogOpen(false);
      setEmail('');
      setFirstName('');
      setLastName('');
      setAddressLine1('');
      setAddressLine2('');
      setMobile('');
      setCity('');
      setCountry('');
      setGender('');
      window.location.reload(false);
      setSnackbarOpen(true);
    }
  };

  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (search !== undefined) {
      const rowData = customers.map((row) => Object
        .values(row).filter((option) => option
        !== true && option !== false && option !== null));
      const matches = rowData.map((row) => row
        .map((option) => option
          .toString().toLowerCase().includes(event.target.value.toString().toLowerCase())));
      console.log(matches);
      const newRows = [];
      matches.map((row, index) => {
        if (row.includes(true)) {
          newRows.push(customers[index]);
        }
        return newRows;
      });
      setCustomers(newRows);
    }
    if (event.target.value === '') {
      retrieveCustomers();
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setDialogOpen(true)}
        >
          Add customer
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
                value={search}
                onChange={handleSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={errorSnackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleErrorSnackbarClose}>
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <Alert severity="success">
          Customer Successfully Added!
        </Alert>
      </Snackbar>
      <Dialog fullWidth maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Grid container justify="center">
          <Grid item style={{ marginTop: '5%' }}>
            <Typography variant="h2" gutterBottom>
              Add a new Customer
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container justify="space-between">
            <Grid item container direction="column" sm>
              <Grid item style={{ marginTop: '5%' }}>
                <TextField
                  label="Email Address"
                  fullWidth
                  id="email"
                  labelid="email"
                  type="email"
                  value={email}
                  variant="outlined"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="First Name"
                  fullWidth
                  id="firstName"
                  labelid="firstName"
                  type="firstName"
                  value={firstName}
                  variant="outlined"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="Last Name"
                  fullWidth
                  id="lastName"
                  labelid="lastName"
                  type="lastName"
                  value={lastName}
                  variant="outlined"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <Select style={{ width: '12em' }} labelid="gender" id="gender" displayEmpty renderValue={gender.length > 0 ? undefined : () => 'gender'} value={gender} onChange={(event) => setGender(event.target.value)}>
                  {genderOption.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="Address Line 1"
                  fullWidth
                  id="addressLine1"
                  labelid="addressLine1"
                  type="addressLine1"
                  value={addressLine1}
                  variant="outlined"
                  onChange={(event) => setAddressLine1(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  id="addressLine2"
                  labelid="addressLine2"
                  type="addressLine2"
                  value={addressLine2}
                  variant="outlined"
                  onChange={(event) => setAddressLine2(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="City"
                  fullWidth
                  id="city"
                  labelid="city"
                  type="city"
                  value={city}
                  variant="outlined"
                  onChange={(event) => setCity(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="Country"
                  fullWidth
                  id="country"
                  labelid="country"
                  type="country"
                  value={country}
                  variant="outlined"
                  onChange={(event) => setCountry(event.target.value)}
                />
              </Grid>
              <Grid item style={{ marginTop: '2%' }}>
                <TextField
                  label="Mobile"
                  fullWidth
                  id="mobile"
                  labelid="mobile"
                  type="mobile"
                  value={mobile}
                  variant="outlined"
                  onChange={(event) => setMobile(event.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container justify="center" style={{ marginBottom: '5%' }}>
          <Grid item>
            <Button onClick={() => setDialogOpen(false)} color="primary" style={{ fontWeight: 300 }}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              className={classes.button}
              style={{ fontWeight: 300 }}
              onClick={addCustomer}
            >
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  setCustomers: PropTypes.func,
  retrieveCustomers: PropTypes.func,
  customers: PropTypes.array.isRequired
};

export default Toolbar;
