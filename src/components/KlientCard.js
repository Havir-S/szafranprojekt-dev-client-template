import { Box, Typography, Stack, Grid, Paper, Button } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningBeforeDelete from './WarningBeforeDelete.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const KlientCard = ({client, toggleEditClient, setEditedClient,}) => {
  const navigate = useNavigate()
  const deleteClient = () => {
    axios({
      method:'delete',
      url: `http://localhost:3001/clients/delete/${client._id}`
      
    }).then(response => {
      navigate(`/klienci`)
    })
  }

  //FUNCTION PREPARING EVERYTHING TO EDIT THIS SPECIFIC CLIENT
  const prepareToEdit = () => {
    toggleEditClient(true);
    setEditedClient(client)
  }

  return (
    <Grid item xs={3}>
        <Paper elevation={3} sx={{p: 2, }}>
            <Stack direction='column' justifyContent={'center'} alignItems={'center'}>
              {(client.smallPicture === '' || client.smallPicture === undefined) ? 
              <AccountCircleIcon sx={{fontSize: '7.6rem'}}/> :
              <img src={client.smallPicture} alt='' style={{width: '120px', objectFit:'cover', borderRadius: '50%', border: '2px solid #ccc', boxShadow: '0 2px 9px rgba(0,0,0,.3)', height: '120px'}} />
              }
              <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', wordBreak: 'break-word'}}>{client.title}</Typography>
              <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif',  fontSize: '1.1rem', textAlign: 'center', wordBreak: 'break-word'}}>email: {client.email}</Typography>
              <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', mb: 1, fontSize: '1.1rem', textAlign: 'center' }}>tel. +{client.telefon}</Typography>
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif',  fontSize: '1.1rem', color: '#555', textAlign: 'center'}}>Projekty : <span style={{fontWeight: 'bold'}}>{client.projects.length}</span></Typography>

            <Box sx={{borderTop: '1px solid #999', width: '70%', my: 1}} />
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', my: 1, fontSize: '1rem', fontStyle: 'italic', textAlign: 'center', wordBreak: 'break-word'}}>{client.note}</Typography>
            <Box sx={{borderTop: '1px solid #999', width: '70%', my: 1}} />
            <Stack direction="row" justifyContent={'center'} gap={1} sx={{width: '100%', mt: '10px'}}>

                  <Button onClick={prepareToEdit} variant='contained'>
                     Edytuj Kontakt
                  </Button>



                    <WarningBeforeDelete functionToStart={deleteClient} title={`Usunąć KONTAKT - ${client.title}?`} name={`Usunięcie ${client.title} z kontaktów, usunie również WSZYSTKIE PROJEKTY z bazy danych związane z tym kontaktem.`} text={`Odczekaj 5 sekund przed usunięciem i zastanów się czy chcesz usunąć ten kontakt i te projekty.`} deleteThis={'Usuń Kontakt'} />


            </Stack>
            <Stack direction="row" alignItems={'center'} gap={1} justifyContent={'center'} sx={{width: '100%', mt: '10px'}}>

                <Button variant='contained'>
                    Projekty
                  </Button>

                <Button variant='contained'>
                    Wiadomości
                  </Button>

            </Stack>
            
            
          
            </Stack>
        </Paper>
    </Grid>
  )
}

export default KlientCard