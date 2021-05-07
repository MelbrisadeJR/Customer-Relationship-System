import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

const CustomDialog = ({ openDialog, onDialogClose }) => {
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={openDialog}
      onClose={onDialogClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Verification Email Sent Out</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please log in your email and click the verification link to complete register.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  onDialogClose: PropTypes.func,
  openDialog: PropTypes.bool
};

CustomDialog.defaultProps = {
  onDialogClose: () => {},
  openDialog: false
};

export default CustomDialog;
