import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import {
  Avatar,
  Box,
  TextField,
  Card,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  lighten,
  Toolbar,
  Tooltip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import CustomerService from '../../../services/customer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'gender', label: 'Gender' },
  { id: 'address', label: 'Address' },
  { id: 'phone', label: 'Phone' },
  { id: 'create_At', label: 'Create At' },
  { id: 'update At', label: 'Update At' },
  { id: 'view', label: 'View' }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [undo, setUndo] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: '#FF3232', message: 'Row Deleted!' });

  const onDelete = () => {
    const newRows = [...props.customers];
    const selectedRows = newRows.filter((customer) => props.selected.includes(customer.customerId));
    props.setCustomers(newRows);
    setUndo(selectedRows);
    props.setSelected([]);
    setAlert({ ...alert, open: true });
  };
  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...props.customers];
    const redo = [...undo];
    Array.prototype.push.apply(newRows, ...redo);
    props.setCustomers(newRows);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected}
          selected
        </Typography>
      ) : (
        null
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        null
      )}
      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color
          }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={alert.message}
        autoHideDuration={4000}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setAlert({ ...alert, open: false });
            const newRows = [...props.customers];
            const ids = [...undo.map((customer) => customer.customerId)];
            props.setCustomers(newRows.filter((customer) => !ids.includes(customer.customerId)));
            CustomerService.deleteMultipleCustomersByIds(ids);
            props.retrieveCustomers();
          }
        }}
        action={(
          <Button
            onClick={onUndo}
            style={{ color: '#fff' }}
          >
            Undo
          </Button>
        )}
      />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  retrieveCustomers: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  setCustomers: PropTypes.func.isRequired
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  customers,
  setCustomers,
  retrieveCustomers,
  ...rest
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
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
  const [customerId, setCustomerId] = useState('');
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.customerId);
    } else {
      newSelectedCustomerIds = [];
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds
        .concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const updateCustomer = () => {
    const existCustomer = {
      customerId,
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
    if (email !== '' && customerId !== '') {
      console.log(existCustomer);
      CustomerService.updateCustomer(customerId, existCustomer);
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
      setSnackbarOpen(true);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <EnhancedTableToolbar
            customers={customers}
            setCustomers={setCustomers}
            selected={selectedCustomerIds}
            setSelected={setSelectedCustomerIds}
            numSelected={selectedCustomerIds.length}
            retrieveCustomers={retrieveCustomers}
          />
          <Table>
            <EnhancedTableHead
              classes={classes}
              numSelected={selectedCustomerIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAll}
              onRequestSort={handleRequestSort}
              rowCount={customers.length}
            />
            <TableBody>
              {stableSort(customers, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit).map((customer) => (
                  <TableRow
                    hover
                    key={customer.customerId}
                    selected={selectedCustomerIds.indexOf(customer.customerId) !== -1}
                  >
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.customerId) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.customerId)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        <Avatar
                          className={classes.avatar}
                          src={customer.avatarUrl}
                        >
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {`${customer.firstName}, ${customer.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {customer.email}
                    </TableCell>
                    <TableCell align="center">
                      {customer.gender}
                    </TableCell>
                    <TableCell align="center">
                      {`${customer.city}, ${customer.country}`}
                    </TableCell>
                    <TableCell align="center">
                      {customer.mobile}
                    </TableCell>
                    <TableCell align="center">
                      {moment(customer.createAt, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {customer.updateAt === null ? 'N/A' : moment(customer.updateAt, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="VisibilitySharp" onClick={() => { setDialogOpen(true); setCustomerId(customer.customerId); }}>
                        <VisibilitySharpIcon style={{ fontSize: 30 }} color="primary" />
                      </IconButton>
                    </TableCell>
                    <Dialog fullWidth maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
                      <Grid container justify="center">
                        <Grid item style={{ marginTop: '5%' }}>
                          <Typography variant="h2" gutterBottom>
                            Update Customer
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
                                labelId="email"
                                type="email"
                                defaultValue={customer.email}
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
                                value={customer.firstName}
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
                                value={customer.lastName}
                                variant="outlined"
                                onChange={(event) => setLastName(event.target.value)}
                              />
                            </Grid>
                            <Grid item style={{ marginTop: '2%' }}>
                              <Select
                                style={{ width: '12em' }}
                                labelid="gender"
                                id="gender"
                                displayEmpty
                                defaultvalue={customer.gender}
                                value={customer.gender}
                                onChange={(event) => setGender(event.target.value)}
                              >
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
                                value={customer.addressLine1}
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
                                value={customer.addressLine2}
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
                                value={customer.city}
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
                                value={customer.country}
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
                                value={customer.mobile}
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
                            onClick={updateCustomer}
                          >
                            Update Customer
                          </Button>
                        </Grid>
                      </Grid>
                    </Dialog>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <Alert severity="success">
          Customer Successfully Updated!
        </Alert>
      </Snackbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  retrieveCustomers: PropTypes.func,
  setCustomers: PropTypes.func
};

export default Results;
