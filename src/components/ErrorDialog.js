import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function AlertDialog({errorDialog, toggleErrorDialog}) {


  return (
    <div>
      <Dialog open={errorDialog ? true : false} onClose={() => {toggleErrorDialog('')}} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorDialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {toggleErrorDialog('')}} autoFocus>Rozumiem</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}