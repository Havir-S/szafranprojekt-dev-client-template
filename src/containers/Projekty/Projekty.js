import { Container, Box, Stack, Item, Button, TextField, Paper, Grid, Typography, Divider, Modal } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useSearchParams  } from 'react-router-dom';

import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

import SearchIcon from '@mui/icons-material/Search';
import { ProjectCard, NewProject, DataGridProjects, Pagination, EditProject } from '../../components';
import { images } from '../../constants';
import axios from 'axios';

const Projekty = () => {
    //just user picked view
    const [widok,setWidok] = useState(true)
    //search query params
    const [searchParams, setSearchParams] = useSearchParams()

    //Current search page
    const showStrona = searchParams.get('strona') || 1;
    
    //How many post pages
    const [howManyPosts, setHowManyPosts] = useState(1);

    //All the sent projects from server
    const [projekty, setProjekty] = useState([])
    

    //EDIT PROJEKT SETUP
    // EVERY PROJECTCARD CAN TRIGGER EDITING AND THE DATA OF THE USED project IS GOING TO BE SENT HERE
    // AND THEN THE EditProject component can get new user input and send it to the server
    const [editProject, toggleEditProject] = useState(false);
    const [editedProject, setEditedProject] = useState({});

    useEffect(() => {
        // setSearchParams({strona: 1});
        axios({
            method: 'get',
            url: `http://localhost:3001/projects/all?strona=${showStrona}`,
        }).then(response => {
            setProjekty(response.data.projects)
            setHowManyPosts(response.data.numberOfPages)
        })

    }, [showStrona])
  return (
    <Container sx={{ p: 2, display: 'flex', flexDirection: 'column', gap:2}} maxWidth={false} >
        <EditProject editProject={editProject} toggleEditProject={toggleEditProject} editedProject={editedProject} />
        <Paper elevation={2} sx={{padding: 3, width:'max-content'}}>
            <Stack direction="row" spacing={2}>
                <Box>
                    <NewProject />
                    {/* <Button sx={{fontSize: '1.4rem', height: '100%'}} variant="contained"  startIcon={<AddBoxIcon size='large'  />}>
                        Stwórz Projekt
                    </Button> */}
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
        
            <Stack direction="row" spacing={2} alignItems='center'>
            <Pagination setSearchParams={setSearchParams} strona={showStrona} howManyPosts={howManyPosts} variant="outlined" shape="rounded" />
                <Divider orientation="vertical" variant="middle" flexItem />

                <Typography variant='h5'>Widok:</Typography>
                <Stack  direction="row" alignItems='center' gap={.5}>
                    <ViewListIcon onClick={() => {setWidok(false)}} sx={{fontSize: (!widok ? '2rem' : '1.5rem'), color: (!widok ? '#1976D2' : 'black'), cursor: 'pointer', }} />
                    <GridViewIcon onClick={() => {setWidok(true)}} sx={{fontSize: (widok ? '2rem' : '1.5rem'), color: (widok ? '#1976D2' : 'black'), cursor: 'pointer', }} />
                    
                </Stack>
            </Stack>
        </Paper>
        
        {widok ? 
            <Paper elevation={2} sx={{padding: 3}}>
            <Grid container rowSpacing={3} columnSpacing={3} columns={12}>             
                    {projekty.length > 0 && projekty.map((item, i) => {
                        
                        return (
                            <ProjectCard toggleEditProject={toggleEditProject} setEditedProject={setEditedProject} project={item}  key={i} image={images.test}/>
                        )
                    })}

            </Grid>
        </Paper>
        :
        <Paper elevation={2} sx={{padding: 3}}>
            <DataGridProjects />
        </Paper>
        }
        
        
    </Container>
  )
}

export default Projekty