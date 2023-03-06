import React, {useEffect, useState} from 'react'
import { Box, Typography, Stack, Grid, Paper, Button, Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {WarningBeforeDelete, Mapbox} from '../../components'
import axios from 'axios';

import FileDownload from 'js-file-download'

const Projekt = ({name,}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState('')
    const [deleteReady, toggleDeleteReady] = useState(false);

    useEffect(() => {
      axios({
        method: 'get',
        url: `http://localhost:3001/projects/${id}`,
      }).then(response => {
        console.log(response)
        setProject(response.data)
      })
    }, [])

    const downloadFile = (link, fileName) => {
      console.log(link)
      axios({
        method: 'get',
        url: `http://localhost:3001/download?path=${link}`,
        responseType: 'blob'
      }).then((res) => {
        console.log(res)
        FileDownload(res.data, fileName)
      })
    }

    //THIS FUNCTION IS USED IN THE 'DELETE BUTTON'
    const deleteProject = () => {
      axios({
        method: 'delete',
        url: `http://localhost:3001/projects/delete/${id}`
      })
      .then(response => {
        console.log(response)
        //GO BACK TO PROJECTS
        navigate(`/projekty`)
        
      })
    }


  return (
  <Paper elevation={3} sx={{padding: 1}}>
    
    <Stack direction='row' gap={1}>
    
      <Button variant='contained' onClick={() => {navigate(-1)}}>	&#129044; Wróć</Button>
      <Button variant='contained' color='secondary'>Edytuj</Button>
      <WarningBeforeDelete functionToStart={deleteProject} deleteThis={'USUŃ'} title={'Czy na pewno usunąć ten projekt?'} name={project?.name} text={'Usunięcie PROJEKTU usunie WSZYSTKIE JEGO PLIKI. Odczekaj 5 sekund jeżeli chcesz kontynuować.'} />
    </Stack>
    {project && (
      <Stack gap={3} direction='row' sx={{}}>
      <Box>
        <Stack sx={{px: 2, py: 1, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Nazwa: </Typography>
          <Typography variant='h5' sx={{fontWeight: 'bold'}}>{project.name}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: 1, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Klient: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project?.client?.title} <span style={{fontSize: '.8rem'}}>({project?.client?._id})</span></Typography>
        </Stack>
        <Stack sx={{px: 2, py: 1, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Numer projektu: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.numberProjektu ? project.numberProjektu : '----'}</Typography>
        </Stack>

        <Stack sx={{px: 2, py: 1, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Data startu: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.dateStart ? new Date(project.dateStart).toLocaleDateString('pl-PL') : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Data wrzucenia na serwer: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.createdAt ? new Date(project.createdAt).toLocaleDateString('pl-PL') : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Data terminu: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.dateTermin ? new Date(project.createdAt).toLocaleDateString('pl-PL') : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Data zakończenia: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.dateZakonczenie ? new Date(project.dateZakonczenie).toLocaleDateString('pl-PL') : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5}} direction={'column'} alignItems={'flex-start'} justifyContent={'center'}>
          <Stack justifyContent={'center'} alignItems={'flex-start'} direction='row' gap={1}>
            <Typography sx={{width: '120px', border: '1px solid #1976D2', padding: .5, fontWeight: 'bold'}}>Zaczęte?</Typography>
            <Typography sx={{width: '120px', border: '1px solid #1976D2', padding: .5,  fontWeight: 'bold'}}>Skończone?</Typography>
            <Typography sx={{width: '120px', border: '1px solid #1976D2', padding: .5,  fontWeight: 'bold'}}>Dostarczone?</Typography>
            <Typography sx={{width: '120px', border: '1px solid #1976D2', padding: .5,  fontWeight: 'bold'}}>Rozliczone?</Typography>
            <Typography sx={{width: '120px', border: '1px solid #1976D2', padding: .5,  fontWeight: 'bold'}}>Zamknięte?</Typography>
          </Stack>
          <Stack justifyContent={'center'} alignItems={'center'} direction='row' gap={1}>
            <Typography sx={{width: '120px', padding: .5, border: '1px solid #1976D2'}}>{project.zaczete ? 'TAK' : 'NIE'}</Typography>
            <Typography sx={{width: '120px', padding: .5, border: '1px solid #1976D2'}}>{project.skonczone ? 'TAK' : 'NIE'}</Typography>
            <Typography sx={{width: '120px', padding: .5, border: '1px solid #1976D2'}}>{project.dostarczone ? 'TAK' : 'NIE'}</Typography>
            <Typography sx={{width: '120px', padding: .5, border: '1px solid #1976D2'}}>{project.wplacone ? 'TAK' : 'NIE'}</Typography>
            <Typography sx={{width: '120px', padding: .5, border: '1px solid #1976D2'}}>{project.zamkniete ? 'TAK' : 'NIE'}</Typography>
            </Stack>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Kwota: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.doZaplaty ? project.doZaplaty : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>TAGI: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.tags ? project.tags.join(', ') : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Na dysku: </Typography>
          <Typography variant='h5' sx={{display: 'inline-block', fontWeight: 'bold'}}>{project.disk ? project.disk : '----'}</Typography>
        </Stack>
        <Stack sx={{px: 2, py: .5, width: 700, borderBottom: '1px solid #aaa'}} direction={'column'} alignItems={'flex-start'} justifyContent={'center'}>
          <Typography variant='h5' sx={{display: 'inline-block', width: 300}}>Pliki: </Typography>
          <Paper elevation={5} sx={{ width: '100%', p: 1}}>
            { project.files.length > 0 ? project.files.map((item,i) => {
              return (
                
                <Box key={i}>
                  <Stack  direction={'row'} alignItems={'center'} justifyContent={'space-between'} key={i} padding={.5}>
                    <Typography variant='h5'>+ {item.name} ({item.size})</Typography>
                    <Button variant='contained' sx={{ml: 1}} onClick={() => {downloadFile(item.path,item.name) }}>Pobierz</Button>
                  </Stack>
                  <Divider />
                </Box>
              )
            }) : ''}
          </Paper>
        </Stack>
        </Box>

        <Paper className='' elevation={6} sx={{ flex: 1, p: 2}}>
            {console.log(project)}
          <Mapbox mapka={{color: project.color, mapCoords: project.mapCoords, name: project.name, id: project._id, dateStart: project.dateStart}} />
        </Paper>
      </Stack>
    )}
      
    </Paper>
  )
}

export default Projekt