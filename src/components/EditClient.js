import  React, {useEffect, useState, useRef} from 'react';

import {Stack, TextField, Paper, Typography, Checkbox, Autocomplete, Chip, Grid, Container, Box, AlertTitle, Modal } from '@mui/material/'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import 'react-calendar/dist/Calendar.css';
import { useNavigate   } from 'react-router-dom';

import Alert from '@mui/material/Alert';

import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios'

import FileBase from 'react-file-base64'
import { images } from '../constants';
import LinearProgressWithLabel from './LinearProgressWithLabel.js'



export default function EditClient({editClient, toggleEditClient, editedClient}) {
  const [open, setOpen] = useState(false);
  const [dataWarning, setDataWarning] = useState('');
  const dataWarningMessage = 'Spawdź czy numer telefonu nie jest za krótki albo czy email nie jest zły - albo oba. Zdjęcie nie jest potrzebne, ale musi być PNG albo JPG/JPEG.'
  const newImg = useRef(null);

  const navigate = useNavigate()


  //NEW CLIENT DATA TO BE SENT
  const [newContact, setNewContact] = useState({
    title: '',
    email: '',
    telefon: '',
    note: '',
    smallPicture: '',
    id: '',
  });


  useEffect(() => {
    setNewContact({
      title: editedClient.title || '',
      email: editedClient.email || '',
      telefon: editedClient.telefon || '',
      note: editedClient.note || '',
      //EMPTY PICTURE, BUT ONLY BECAUSE BASE64 IS NOT RECOGNISED AND IT WOULD THROW ERROR IF WE WANTED TO SHOW IT LIKE THAT
      //IT STILL WORKS AND CAN SEND PICTURES, JUST THE INITIAL ONE WON'T WORK
      smallPicture: '',
      _id: editedClient._id || ''
    })
  }, [editedClient])

  useEffect(() => {
    console.log(newContact)

  }, [newContact])

  //CHECK DATA AND THROW ERRORS if picture has a wrong mime type
  const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const checkValueBeforeSubmit = () => {
    
    if (newContact.title.length > 0 && (validateEmail(newContact.email) || validateTelefon(newContact.telefon) )) {
      if (newContact.smallPicture === '') {
        handleSubmit();
      } else {
        if (mimeTypes.includes(newContact.smallPicture.type)) {
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
      method: 'patch',
      url: `http://localhost:3001/clients/update/${newContact._id}`,
      data: newContact
    }).then((response) => {
      console.log(response)
    })

    
    //CLEAN UP
    setNewContact({
      title: '',
      email: '',
      telefon: '',
      smallPicture: '',
      _id: ''
    });
    // setOpen(false)
    setDataWarning('')
    toggleEditClient(false)

    //REFRESH PAGE
    navigate(0)
    
  }



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
        smallPicture: file
      }
    })
  }



  return (
    <>
      <Modal open={editClient} onClose={() => {toggleEditClient(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,}}>
          <Typography variant='h4' sx={{p: '15px 25px 0', fontSize: '2rem', fontWeight: 'bold'}}>EDYTOWANIE KONTAKTU</Typography>
              <Stack direction='row' gap={2}>
                  
                  <Paper elevation={6} sx={{ flex : 1, p: 2}}>
                      <Typography variant='h5' fontWeight='bold' sx={{my:1}}>Nazwa kontaktu:</Typography>
                      <TextField label="Filled" name='title'  value={newContact.title} onChange={(e) => handleChange(e.target) } variant="filled" fullWidth/>

                      <Stack direction='row' gap={2}>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '250px'}}>Email:</Typography>                
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '150px'}}>Telefon:</Typography>                

                          
                      </Stack>
                      <Stack direction='row' gap={2}>
                          <TextField type='email' name='email' value={newContact.email} onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '250px'}} variant="filled" />
                          <TextField type='number' name='telefon' value={newContact.telefon} onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '150px'}} variant="filled" />

                          
                      </Stack>
                      <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '250px', display: 'block'}}>Notatka:</Typography>  
                      <TextField multiline rows={3} type='string'  value={newContact.note} name='note' onChange={(e) => handleChange(e.target) } label="Filled" sx={{ width: '100% !important', display: 'block'}} variant="filled" />

                      <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '130px'}}>Zdjęcie:</Typography>     
                      <Stack direction='row' alignItems={'center'} gap={2}>
                        <Paper elevation={5} sx={{overflow: 'hidden', border: '1px solid #aaa', borderRadius: '50%', width: '120px', height: '120px',display: 'inline-block'}}>
                          <img ref={newImg} src={newContact.smallPicture} alt='/' style={{objectFit: 'cover', width: '120px', height: '120px'}} />
                        </Paper>
                        <FileBase type='file' multiple={false} onDone={(file) => {handleNewPic(file)}}/>
                      </Stack> 
                  </Paper>

              </Stack>
          <Container sx={{my: 1.5}}>
            <Paper elevation={6}>
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
          <Box sx={{margin: 'auto', width: 'max-content'}}>
            <Button variant='contained' onClick={checkValueBeforeSubmit}>Edytuj Kontakt</Button>
            <Button onClick={() => {toggleEditClient(false)}}>Zamknij</Button>
          </Box>
        </Box>
    </Modal>

    </>
  );
}