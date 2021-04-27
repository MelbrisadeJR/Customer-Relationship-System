import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Rating from '@material-ui/lab/Rating';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import FeedbackService from '../../../services/feedback';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  button: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 5,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const Toolbar = ({
  className,
  rows,
  setRows,
  retrieveRows,
  ...rest
}) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [starValue, setstarValue] = React.useState(0);
  const [starHover, setStarHover] = React.useState(-1);
  const [snakebarOpen, setSnakebarOpen] = React.useState(false);
  const [errorSnakebarOpen, setErrorSnakebarOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [search, setSearch] = useState('');
  const productOptions = ['Product1', 'Product2', 'Product3'];

  const addAFeedback = () => {
    const newFeedback = {
      description,
      rating: starValue,
      productName: product
    };
    if (product === '') {
      setErrorSnakebarOpen(true);
      setError('Please Enter Product Name!');
    }
    if (starValue === 0) {
      setErrorSnakebarOpen(true);
      setError('Please Select At Least Half Star!');
    }
    if (description === '') {
      setErrorSnakebarOpen(true);
      setError('Please Enter Description!');
    }
    if (description !== '' && starValue !== 0 && product !== '') {
      FeedbackService.createFeedback(newFeedback);
      setDialogOpen(false);
      setProduct('');
      setDescription('');
      setstarValue(0);
      window.location.reload(false);
      setSnakebarOpen(true);
    }
  };

  const handleErrorSnakebarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnakebarOpen(false);
  };

  const handleSnakebarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnakebarOpen(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (search !== undefined) {
      const rowData = rows.map((row) => Object
        .values(row).filter((option) => option
        !== true && option !== false && option !== null));
      const matches = rowData.map((row) => row
        .map((option) => option
          .toString().toLowerCase().includes(event.target.value.toString().toLowerCase())));
      console.log(matches);
      const newRows = [];
      matches.map((row, index) => {
        if (row.includes(true)) {
          newRows.push(rows[index]);
        }
        return newRows;
      });
      setRows(newRows);
    }
    if (event.target.value === '') {
      retrieveRows();
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
          Add Feedback
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
                placeholder="Search feedback"
                variant="outlined"
                value={search}
                onChange={handleSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={errorSnakebarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleErrorSnakebarClose}>
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={snakebarOpen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1000} onClose={handleSnakebarClose}>
        <Alert severity="success">
          Feedback Successfully Added!
        </Alert>
      </Snackbar>
      <Dialog fullWidth maxWidth="xs" open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Grid container justify="center">
          <Grid item style={{ marginTop: '5%' }}>
            <Typography variant="h2" gutterBottom>
              Add a new Feedback
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid container justify="space-between">
            <Grid item container direction="column" sm>
              <Grid item>
                <Select style={{ width: '12em' }} labelid="product" id="product" displayEmpty renderValue={product.length > 0 ? undefined : () => 'Select a product'} value={product} onChange={(event) => setProduct(event.target.value)}>
                  {productOptions.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item style={{ marginTop: '5%' }}>
                <Rating
                  name="hover-feedback"
                  value={starValue}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setstarValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setStarHover(newHover);
                  }}
                />
                {starValue !== null
                  && <Box ml={2}>{starLabels[starHover !== -1 ? starHover : starValue]}</Box>}
              </Grid>
              <Grid item style={{ marginTop: '5%' }}>
                <TextField
                  label="Description"
                  fullWidth
                  id="description"
                  labelid="description"
                  multiline
                  rows={4}
                  value={description}
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
              Add Feedback +
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  setRows: PropTypes.func,
  retrieveRows: PropTypes.func,
  rows: PropTypes.array.isRequired
};

export default Toolbar;
