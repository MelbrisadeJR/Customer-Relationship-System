import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Rating from '@material-ui/lab/Rating';
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
import FeedbackService from '../../../services/feedback';

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
  { id: 'productName', label: 'Product Name' },
  { id: 'rating', label: 'Rating' },
  { id: 'description', label: 'Description' },
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

  const deleteMulitpleFeedbacksbyIds = () => {
    const undoRows = [...undo];
    const arrayids = undoRows.map((undoRow) => (undoRow.id));
    console.log(arrayids);
    axios
      .delete(`http://localhost:8080/api/feedback/feedbacks/${arrayids}`)
      .then((data) => {
        console.log(data);
        props.retrieveRows();
      })
      .catch((err) => console.log(err));
  };

  const onDelete = () => {
    const newRows = [...props.rows];
    const selectedRows = newRows.filter((row) => props.selected.includes(row.id));
    const unSelectedRows = newRows.filter((row) => !props.selected.includes(row.id));
    props.setRows(unSelectedRows);
    setUndo(selectedRows);
    props.setSelected([]);
    setAlert({ ...alert, open: true });
  };
  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...props.rows];
    const redo = [...undo];
    Array.prototype.push.apply(newRows, ...redo);
    props.retrieveRows();
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
            const newRows = [...props.rows];
            const ids = [...undo.map((row) => row.id)];
            props.setRows(newRows.filter((row) => !ids.includes(row.id)));
            deleteMulitpleFeedbacksbyIds();
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
  retrieveRows: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired
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
  }
}));

const starLabels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const Results = ({
  className,
  rows,
  setRows,
  retrieveRows,
  ...rest
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selectedFeedbackIds, setselectedFeedbackIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [starVal, setstarVal] = React.useState(0);
  const [starHo, setStarHo] = React.useState(-1);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const productOptions = ['Product1', 'Product2', 'Product3'];
  const handleSelectAll = (event) => {
    let newselectedFeedbackIds;

    if (event.target.checked) {
      newselectedFeedbackIds = rows.map((feedback) => feedback.id);
    } else {
      newselectedFeedbackIds = [];
    }

    setselectedFeedbackIds(newselectedFeedbackIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFeedbackIds.indexOf(id);
    let newselectedFeedbackIds = [];

    if (selectedIndex === -1) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(selectedFeedbackIds, id);
    } else if (selectedIndex === 0) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(selectedFeedbackIds.slice(1));
    } else if (selectedIndex === selectedFeedbackIds.length - 1) {
      newselectedFeedbackIds = newselectedFeedbackIds
        .concat(selectedFeedbackIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(
        selectedFeedbackIds.slice(0, selectedIndex),
        selectedFeedbackIds.slice(selectedIndex + 1)
      );
    }

    setselectedFeedbackIds(newselectedFeedbackIds);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const addAFeedback = () => {
    const newFeedback = {
      description,
      rating: starVal,
      productName: product
    };
    if (description !== '' && starVal !== 0 && product !== '') {
      FeedbackService.createFeedback(newFeedback);
      setDialogOpen(false);
      setProduct('');
      setDescription('');
      setstarVal(0);
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
            rows={rows}
            setRows={setRows}
            selected={selectedFeedbackIds}
            setSelected={setselectedFeedbackIds}
            numSelected={selectedFeedbackIds.length}
            retrieveRows={retrieveRows}
          />
          <Table>
            <EnhancedTableHead
              classes={classes}
              numSelected={selectedFeedbackIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAll}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit).map((feedback) => (
                  <TableRow
                    hover
                    key={feedback.id}
                    selected={selectedFeedbackIds.indexOf(feedback.id) !== -1}
                  >
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        checked={selectedFeedbackIds.indexOf(feedback.id) !== -1}
                        onChange={(event) => handleSelectOne(event, feedback.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {feedback.productName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Rating
                        name="half-rating-read"
                        defaultValue={0}
                        precision={0.5}
                        value={feedback.rating}
                        readOnly
                      />
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: '5em' }}>
                      {feedback.description}
                    </TableCell>
                    <TableCell align="center">
                      {moment(feedback.create_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      {feedback.update_At === null ? 'N/A' : moment(feedback.update_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="VisibilitySharp" onClick={() => setDialogOpen(true)}>
                        <VisibilitySharpIcon style={{ fontSize: 30 }} color="primary" />
                      </IconButton>
                    </TableCell>
                    <Dialog fullWidth maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
                      <Grid container justify="center">
                        <Grid item style={{ marginTop: '5%' }}>
                          <Typography variant="h2" gutterBottom>
                            Modify a new Feedback
                          </Typography>
                        </Grid>
                      </Grid>
                      <DialogContent>
                        <Grid container justify="space-between">
                          <Grid item container direction="column" sm>
                            <Grid item>
                              <Select
                                style={{ width: '12em' }}
                                labelid="product"
                                id="product"
                                displayEmpty
                                value={feedback.productName}
                                onChange={(event) => setProduct(event.target.value)}
                              >
                                {productOptions.map((option) => (
                                  <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                              </Select>
                            </Grid>
                            <Grid item style={{ marginTop: '5%' }}>
                              <Rating
                                name="hover-feedback"
                                value={feedback.rating}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                  setstarVal(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                  setStarHo(newHover);
                                }}
                              />
                              {starVal
                                !== null
                                && <Box ml={2}>{starLabels[starHo !== -1 ? starHo : starVal]}</Box>}
                            </Grid>
                            <Grid item style={{ marginTop: '5%' }}>
                              <TextField
                                label="Description"
                                fullWidth
                                id="description"
                                labelid="description"
                                multiline
                                rows={4}
                                value={feedback.description}
                                variant="outlined"
                                onChange={(event) => setDescription(event.target.value)}
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
                            onClick={addAFeedback}
                          >
                            Modify Feedback +
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
        count={rows.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <Alert severity="success">
          Feedback Successfully Added!
        </Alert>
      </Snackbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.array.isRequired,
  retrieveRows: PropTypes.func,
  setRows: PropTypes.func
};

export default Results;
