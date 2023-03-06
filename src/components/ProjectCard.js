import { Box, Typography, Stack, Grid, Paper, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";

const ProjectCard = ({image,name,date,client,tags, setEditedProject, toggleEditProject, project}) => {
    const Navigate = useNavigate();


  const startEditing = () => {
    setEditedProject(project)
    toggleEditProject(true)
  }
  return (
    <Grid item xs={3}>
        <Paper elevation={3} sx={{p: 2, }}>
            <img style={{objectFit: 'cover', width: '100%'}} src={image} alt='' />
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', fontWeight: 'bold', fontSize: '2rem', wordBreak: 'break-word'}}>{project.name}</Typography>
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', fontSize: '1.1rem' }}>{date !== '1.01.1970' ? new Date(project.dateStart).toLocaleDateString('pl-PL') : 'Nie podano daty'}</Typography>
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', fontSize: '1.1rem', color: '#555', wordBreak: 'break-word'}}>{project?.client?.title}</Typography>
            <Typography variant='h5' sx={{fontFamily: 'Saira, sans-serif', my: 2, fontSize: '1rem', fontStyle: 'italic', wordBreak: 'break-word'}}><span style={{fontWeight: 'bold'}}>Ulice/TAGI: </span> {project.tags.join(', ')}</Typography>
            <Stack direction="row" justifyContent={'space-between'} sx={{mx: 3}}>
                <Button onClick={() => {Navigate(`/projekty/${project._id}`)}}  style={{textDecoration: 'none'}}>
                Sprawdź Projekt
                </Button>
                <Button onClick={() => {startEditing()}} style={{textDecoration: 'none'}}>
                Edytuj projekt
                </Button>
            </Stack>
        </Paper>
    </Grid>
  )
}

export default ProjectCard