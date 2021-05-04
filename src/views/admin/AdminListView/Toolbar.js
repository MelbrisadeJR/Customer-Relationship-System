import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default function AlertDialogSlide() {
  const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
      marginRight: theme.spacing(1)
    },
    exportButton: {
      marginRight: theme.spacing(1)
    }
  }));

  const Toolbar = ({ className, ...rest }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
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
            onClick={handleClickOpen}
          >
            Add New Mission
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Do you want to get a new mission? '}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                As a administrator, do you want to get one more mission?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Yes
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
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
                  placeholder="Search Administrator"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  };

  Toolbar.propTypes = {
    className: PropTypes.string
  };
}
