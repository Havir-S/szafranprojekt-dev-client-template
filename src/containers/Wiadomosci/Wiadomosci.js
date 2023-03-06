import React, {useEffect, useState} from 'react'
import { Container, Box, Typography, Paper, TextField, Button, Stack, Chip, Pagination } from '@mui/material'
import { Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

    const messagesToAdd = [{
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        email: 'signico@gmail.com',
        telefon: '+48 555 222 333',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico2',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekaaat zabudowy obiektu',
        workType: 'Kontaksadft/Pomoc/Współpraca',
        email: 'signico@gmail.com',
        telefon: '+48 555 222 333',
        message: 'Dzień dodasfadsf dasfabry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        email: 'signico@gmail.com',
        telefon: '+48 555 222 333',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        email: 'signico@gmail.com',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        telefon: '+48 555 222 333',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        telefon: '+48 555 222 333',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
    {
        sender: 'Signico',
        date: new Date("2022-09-19T10:42:21.788Z"),
        title: 'Projekt zabudowy obiektu',
        workType: 'Kontakt/Pomoc/Współpraca',
        telefon: '+48 555 222 333',
        message: 'Dzień dobry, przesyłam dokumenty i proszę o wycenę następującego projektu. Proszę o kontakt, pozdrawiam, ..... z Signico.'
    },
]

const Wiadomosci = () => {
    const [messages, setMessages] = useState([])
    const [activeMessageIndex, setActiveMessageIndex] = useState()

    //ADD/GET MESSAGES
    useEffect(() => {
        setMessages(messagesToAdd)
    }, [])

  return (
    <Container sx={{ p: '0 !important', display: 'flex', gap:2,}} maxWidth={false} >
        <Paper sx={{position: 'relative', border: '1px solid #ccc', height: '800px', overflowY: 'scroll', width: '450px', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        <Box sx={{position: 'sticky', top: '0', background: '#ddd', width: '100%', p:1, borderBottom: '1px solid #999'}}>
            <Pagination count={10} variant="outlined" color="primary" sx={{margin: 'auto', width: 'max-content'}} />
        </Box>
        <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center', gap: 1.5, mx: 2, my: 2}}>
                <TextField id="outlined-search" label="Szukaj..." type="search"  />
                <Button size="medium"  variant="contained">Szukaj</Button>
            </Box>
            <Box sx={{borderTop: '1px solid #999', width: '95%'}} />
            {/* <Box sx={{display: 'flex', flexDirection: 'column'}}> */}
            <Box width='100%'>
                {messages.length > 0 && messages.map((item,i) => {
                    {/* <Box key={i} className='message message-active'> */}
                    return (
                        
                        <Box onClick={() => {setActiveMessageIndex(i)}} key={i} className={i === activeMessageIndex ? 'message message-active' : 'message'}>
                            <AccountCircleIcon sx={{fontSize:'50px'}} />
                            <Box sx={{ width: '100%'}}>
                                <Box sx={{display: 'flex', color: '#777', justifyContent: 'space-between'}}>
                                    <Typography variant='body'>{item.sender} </Typography>
                                    <Typography variant='body'>{item.date.getDate() + '.' + item.date.getMonth() + '.' + item.date.getFullYear()}</Typography>
                                </Box>
                                <Typography variant='h5' sx={{fontSize: '1.3rem', my: .5, fontWeight: 'bold'}}>{item.title}</Typography>
                                <Typography variant='h5' sx={{fontSize: '1rem', my: .5, color: '#555', fontWeight: 'bold'}}>{item.workType}</Typography>
                                <Typography variant='h5' sx={{fontSize: '1.05rem', color: '#555',}}>{item.message.slice(0,63) + '...'}</Typography>
                            </Box>
                        </Box> 
                    )
                })}

            </Box>
            
            
            
        </Box>
        
        </Paper>
        <Paper sx={{ border: '1px solid #ccc', minHeight: '500px', maxHeight: '800px', p: 1.5, width: '600px'}}>
            { activeMessageIndex > -1 ? (
                <>
                <Stack direction="row" alignContent={'center'}>
                <Box>
                    <AccountCircleIcon sx={{fontSize:'50px'}} />
                </Box>
                <Stack direction='column' justifyContent={'center'} spacing={1}>
                    <Typography variant='body' sx={{ color: '#000', fontWeight: 'bold'}}>{messages[activeMessageIndex].sender}</Typography>
                    <Typography variant='body'>{messages[activeMessageIndex].date.getDate() + '.' + messages[activeMessageIndex].date.getMonth() + '.' + messages[activeMessageIndex].date.getFullYear()}</Typography>
                    
                </Stack>
                <Box sx={{flex: '1'}} />
                <Stack justifyContent={'center'} alignItems={'center'} gap={.5} direction='row'>
                    <Button variant="outlined">Przejdź do poczty</Button>
                    <PersonAddAlt1Icon sx={{fontSize:'30px', cursor:'pointer', height: '35px', width: '40px', margin: 0, borderRadius: '4px', border: '1px solid rgba(25, 118, 210, 0.5)', "&:hover":{border: '1px solid rgba(25, 118, 210, 1)'}}} />
                    <DeleteIcon sx={{fontSize:'30px', cursor:'pointer', height: '35px', width: '40px', margin: 0, borderRadius: '4px', border: '1px solid rgba(25, 118, 210, 0.5)', "&:hover":{border: '1px solid rgba(25, 118, 210, 1)'}}} />
                </Stack>
                
            </Stack>
            <Box sx={{border: '1px solid #aaa', borderLeft: 0, borderRight: 0, my: 2, py: 3}}>
                <Typography variant='body' sx={{ color: '#000', fontSize: '1.7rem', fontWeight: 'bold', display: 'block', mb: 1}}>{messages[activeMessageIndex].title}</Typography>
                <Typography variant='body' sx={{ color: '#555', fontSize: '1rem', display: 'block', mb: 2}}>{messages[activeMessageIndex].workType}</Typography>
                <Typography variant='body' sx={{ color: '#000', fontSize: '1.3rem', }}>Od <Chip label={messages[activeMessageIndex]?.email ? messages[activeMessageIndex].email : 'Nie podano'} variant="outlined" sx={{mx: 1}} /> <Chip label={messages[activeMessageIndex]?.telefon ? messages[activeMessageIndex].telefon : 'Nie podano'} variant="outlined" /></Typography>
                
                
            </Box>
            <Typography variant='h5' sx={{fontSize: '1.05rem', color: '#555',}}>{messages[activeMessageIndex].message}</Typography>
            </>
            ):
            ''}
            
        </Paper>
    </Container>
  )
}

export default Wiadomosci