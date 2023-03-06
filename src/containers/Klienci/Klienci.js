import React, {useState, useEffect, useCallback} from 'react'
import { useSearchParams  } from 'react-router-dom';

import { Container, Box, Stack, Item, Button, TextField, Paper, Grid } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { KlientCard, NewClient, Pagination, EditClient } from '../../components';
import { images } from '../../constants';
import axios from 'axios';

const Klienci = () => {

    //SEARCH SETUP
    const [clients, setClients] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const showStrona = searchParams.get('strona') || 1;

    //How mnay post pages
    const [howManyPosts, setHowManyPosts] = useState(1);
    
    //EDIT CLIENT SETUP
    // EVERY CLIENTCARD CAN TRIGGER EDITING AND THE DATA OF THE USED CLIENT IS GOING TO BE SENT HERE
    // AND THEN THE EditClient component can get new user input and send it to the server
    const [editClient, toggleEditClient] = useState(false);
    const [editedClient, setEditedClient] = useState({});

    //GET INITIAL DATA
    useEffect(() => {
        // setSearchParams({strona: 1});
        axios({
            method: 'get',
            url: `http://localhost:3001/clients/all?strona=${showStrona}`,
        }).then(response => {
            //CLIENTS WE GET FOR THIS PAGE
            setClients(response.data.clients)
            //GETTING HOW MANY PAGES OF PROJECTS WE HAVE
            setHowManyPosts(response.data.numberOfPages)
        })
        console.log('refresh')
    }, [showStrona])

  return (
    <Container sx={{ p: 2, display: 'flex', flexDirection: 'column', gap:2}} maxWidth={false} >

    {/* //THIS IS THE COMPONENT TO EDIT THE CLIENT */}
    <EditClient editClient={editClient} toggleEditClient={toggleEditClient} editedClient={editedClient} />

        <Paper elevation={2} sx={{padding: 3, width:'max-content'}}>
            <Stack direction="row" spacing={2}>
                <Box>
                    <NewClient />
                </Box>
                <Stack direction="row">
                    <TextField id="outlined-search" label="Szukaj..." type="search"  />
                    <Button sx={{fontSize: '1.2rem'}} variant="contained">
                        <SearchIcon sx={{fontSize: '1.8rem', mr: 1}}  />
                        Szukaj 
                        
                    </Button>
                </Stack>

            </Stack>
        </Paper>
        <Paper elevation={2} sx={{padding: 1, width:'max-content'}}>
            <Pagination setSearchParams={setSearchParams} strona={showStrona} howManyPosts={howManyPosts} variant="outlined" shape="rounded" />
        </Paper>
        
        <Paper elevation={2} sx={{padding: 3}}>
            <Grid container rowSpacing={3} columnSpacing={3} columns={12}>
                {clients.length > 0 && clients.map((item,key) => {
                    return (
                        <KlientCard key={key} client={item} setEditedClient={setEditedClient} toggleEditClient={toggleEditClient}/>
                    )
                })}
            </Grid>
        </Paper>


    </Container>
  )
}

export default Klienci