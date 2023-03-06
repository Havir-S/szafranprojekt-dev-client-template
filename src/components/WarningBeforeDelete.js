import React, {useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WarningBeforeDelete({deleteThis, functionToStart, title, name, text}) {
    const [timerOver, setTimerOver] = useState(false)
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
    const timerInterval = setInterval(function() {

        console.log('5s')
        setTimerOver(false)
        clearInterval(timerInterval);
        
      }, 5000)
  };

  //CLOSE - DELETE
  const handleDelete = () => {
    functionToStart();
    setOpen(false);
    setTimerOver(true);
  }

  //CLOSE - DON'T DELETE
  const handleClose = () => {
    setOpen(false);
    setTimerOver(true);
  };



  return (
    <div>
      <Button variant='contained' color='error' onClick={handleClickOpen}>
        {deleteThis}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
          <hr/>
          {name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant='contained' disabled={timerOver ? true : false} color='error'>USUŃ</Button>
          <Button onClick={handleClose} variant='contained' color='primary' autoFocus>
            WRÓĆ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}