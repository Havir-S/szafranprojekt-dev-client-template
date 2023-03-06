import  React, {useEffect, useState, useRef} from 'react';
import Box from '@mui/material/Box';
import {Stack, TextField, Paper, Typography, Checkbox, Autocomplete, Chip, Grid, Container, AlertTitle } from '@mui/material/'
import LinearProgress from '@mui/material/LinearProgress';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate   } from 'react-router-dom';

import Alert from '@mui/material/Alert';

import AddBoxIcon from '@mui/icons-material/AddBox';

import {MapboxPolygonMaker} from './'

import Dropzone from 'react-dropzone'
import axios from 'axios'

import FileBase from 'react-file-base64'
import { images } from '../constants';
import LinearProgressWithLabel from './LinearProgressWithLabel.js'



export default function NewClient() {
  const [open, setOpen] = useState(false);
  const [dataWarning, setDataWarning] = useState('');
  const dataWarningMessage = 'Spawdź czy numer telefonu nie jest za krótki albo czy email nie jest zły - albo oba. Zdjęcie nie jest potrzebne, ale musi być PNG albo JPG/JPEG.'
  const newImg = useRef(null);
  const [diskSpace, setDiskSpace] = useState({
    capacity: 0,
    available: '',
    used: ''
  });
  const navigate = useNavigate()

  useEffect(() => {
    console.log(diskSpace)
  }, [diskSpace])

  //NEW CLIENT DATA TO BE SENT
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    telefon: '',
    note: '',
    picture: '',

  });

  //CHECK DATA AND THROW ERRORS
  const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const checkValueBeforeSubmit = () => {
    
    if (newContact.name.length > 0 && (validateEmail(newContact.email) || validateTelefon(newContact.telefon) )) {
      if (newContact.picture === '') {
        handleSubmit();
      } else {
        if (mimeTypes.includes(newContact.picture.type)) {
          handleSubmit();
        } else {
          setDataWarning('error')
        }
      }
    } else {
      setDataWarning('error')
    }
  }

  const validateTelefon = (tel) => {

    return Boolean(tel.length > 6)
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  //SENDING DATA =============
  const handleSubmit = () => {
    console.log(newContact)

    //SEND DATA
    axios({
      method: 'post',
      url: 'http://localhost:3001/clients/new',
      data: newContact
    }).then((response) => {
      console.log(response)
    })

    
    //CLEAN UP
    setNewContact({
      name: '',
      email: '',
      telefon: '',
      picture: ''
    });
    setOpen(false)
    setDataWarning('')

    //REFRESH PAGE
    navigate(0)
    
  }

  // useEffect(() => {
  //   console.log(newContact)
  // }, [newContact])



  //open and close the NEW CLIENT WINDOW
  const handleClickOpen = () => {

    // GET C DRIVE SIZE FOR CHECKUP
    axios({
      method: 'get',
      url: 'http://localhost:3001/drives/C',
    }).then((response) => {
      console.log(response.data)
      // const {capacity: Number(response.data.diskId.capacity), mounted, used} = response.data.diskId
      // console.log(capacity, mounted, used)
      const newDiskData = {
        ...response.data,
        capacity: Number(response.data.capacity.replace('%',''))
      }
      setDiskSpace(newDiskData)
    })

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


// ========================================= INPUT HANDLING STARTS HERE


  //HANDLE CHANGE OF DATA
  const handleChange = (e) => {
    setNewContact((prevState) => {
      return {
        ...prevState,
        [e.name]: e.value
      }
    })
  }

  /// PICTURE CHANGE AND DATA PICTURE CHANGE
  const handleNewPic = (file) => {
    newImg.current.src=`${file.base64}`;
    setNewContact((prevState) => {
      return {
        ...prevState,
        picture: file
      }
    })
  }



  return (
    <>

      <Button sx={{fontSize: '1.4rem', height: '100%'}} variant="contained"  onClick={handleClickOpen} startIcon={<AddBoxIcon size='large'  />}>
                        Stwórz KONTAKT
        </Button>
      <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={handleClose} >
        <Typography variant='h4' sx={{p: '15px 25px 0', fontSize: '2rem', fontWeight: 'bold'}}>TWORZENIE KONTAKTU</Typography>
        <DialogContent>
            <Stack direction='row' gap={2}>
                
                <Paper elevation={6} sx={{ flex : 1, p: 2}}>
                    <Typography variant='h5' fontWeight='bold' sx={{my:1}}>Nazwa kontaktu:</Typography>
                    <TextField label="Filled" name='name' onChange={(e) => handleChange(e.target) } variant="filled" fullWidth/>

                    <Stack direction='row' gap={2}>
                        <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '250px'}}>Email:</Typography>                
                        <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '150px'}}>Telefon:</Typography>                

                        
                    </Stack>
                    <Stack direction='row' gap={2}>
                        <TextField type='email' name='email' onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '250px'}} variant="filled" />
                        <TextField type='number' name='telefon' onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '150px'}} variant="filled" />

                        
                    </Stack>
                    <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '250px', display: 'block'}}>Notatka:</Typography>  
                    <TextField multiline rows={3} type='string' name='note' onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '100% !important', display: 'block'}} variant="filled" />

                    <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '130px'}}>Zdjęcie:</Typography>     
                    <Stack direction='row' alignItems={'center'} gap={2}>
                      <Paper elevation={5} sx={{overflow: 'hidden', border: '1px solid #aaa', borderRadius: '50%', width: '120px', height: '120px',display: 'inline-block'}}>
                        <img ref={newImg} src={images.test} alt='/' style={{objectFit: 'cover', width: '120px', height: '120px'}} />
                      </Paper>
                      <FileBase type='file' multiple={false} onDone={(file) => {handleNewPic(file)}}/>
                    </Stack> 
                </Paper>

            </Stack>

        </DialogContent>
        <Container>
          <Paper elevation={6}>
          <Typography sx={{px: 1, pt: 1}}><span style={{fontWeight: 'bold'}}>Informacje</span> o Klientach i Projektach zapisywane są na dysku 'C'.</Typography>
          <Typography sx={{px: 1}}>Powinno zostawić się minimum <span style={{fontWeight: 'bold'}}>150gb</span> na zapis.</Typography>
          <Typography sx={{px: 1}}>Stan dysku:</Typography>
          <LinearProgressWithLabel value={diskSpace.capacity}  />
          <Typography sx={{px: 1, pb: 1}}>Zajęto: <span style={{fontWeight: 'bold'}}>{diskSpace.used}.</span> Wolne: <span style={{fontWeight: 'bold'}}>{diskSpace.available}.</span></Typography>
            <Alert severity={dataWarning === 'error' ? 'error' ? 'warning' : 'warning' : 'success'} sx={{fontWeight: 'bold', display: (dataWarning ? 'flex' : 'none')}}>
              
              {dataWarningMessage}
              {/* {dataWarning === 'error' ? (
                <span>Nowy kontakt potrzebuje mieć nazwę i przynajmniej jeden rodzaj kontaktu!</span>
              )
                :
                ''
              } */}
              
            </Alert>
          </Paper>
        </Container>
        
        <DialogActions>
          <Button variant='contained' onClick={checkValueBeforeSubmit}>Stwórz Kontakt</Button>
          <Button onClick={handleClose}>Zamknij</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}