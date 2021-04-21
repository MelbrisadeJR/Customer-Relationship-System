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

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [products, setProducts] = useState(false);
  const [description, setDescription] = useState('');
  const [starValue, setstarValue] = React.useState(2);
  const [starHover, setStarHover] = React.useState(-1);

  const productOptions = ['Product1', 'Product2', 'Product3'];

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
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
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
                <Select style={{ width: '12em' }} labelId="producs" id="products" displayEmpty renderValue={products.length > 0 ? undefined : () => 'Select a product'} value={products} onChange={(event) => setProducts(event.target.value)}>
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
                  labelId="description"
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
              color="contained"
              className={classes.button}
              style={{ fontWeight: 300 }}
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
  className: PropTypes.string
};

export default Toolbar;
