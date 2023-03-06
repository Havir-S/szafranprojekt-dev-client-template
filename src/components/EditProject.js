import  React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Stack, TextField, Paper, Typography, Checkbox, Autocomplete, Chip, Grid, Modal } from '@mui/material/'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import UploadFileIcon from '@mui/icons-material/UploadFile';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'

import {useParams, useNavigate} from 'react-router-dom';

import AddBoxIcon from '@mui/icons-material/AddBox';

import {MapboxPolygonMaker} from './'

import Dropzone from 'react-dropzone'
import FileBase from 'react-file-base64'

import LinearProgressWithLabel from './LinearProgressWithLabel.js'
import ErrorDialog  from './ErrorDialog';
import RadioDiskCheck from './RadioDiskCheck'
import NewClient from './NewClient'


export default function EditProject({editProject, toggleEditProject, editedProject}) {
  const navigate = useNavigate()
  //display check
  const [open, setOpen] = useState(false);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   ////////////////////////////////////////////// DATA HANDLE START

  //THIS IS THE FULL DATA GOING TO BE SENT //except for dates
  const [data, setData] = useState({
    name: '',
    client: '',
    // dateStart: '',
    // dateTermin: '',
    // dateZakonczenie: '',
    doZaplaty: '',
    numberProjektu: '',
    zaczete: false,
    skonczone: false,
    dostarczone: false,
    wplacone: false,
    zamkniete: false,
    tags: [],
    dateStart: new Date().toLocaleDateString(),
    dateTermin: new Date().toLocaleDateString(),
    dateZakonczenie: new Date().toLocaleDateString(),
    disk: '',
    oldFiles: [],
  })
  const [dataMap, setDataMap] = useState({
    mapCoords: [],
    color: '#ff00ff'
  })

  //SET THE ALREADY EXISTING DATA INTO THE OBJECT
  useEffect(() => {
    console.log(editedProject)
    setData({
      name: editedProject.name || '',
      //NEEDS A FIX
      client:  '',
      // dateStart: '',
      // dateTermin: '',
      // dateZakonczenie: '',
      doZaplaty: editedProject.doZaplaty || '',
      numberProjektu: editedProject.numberProjektu || '',
      zaczete: editedProject.zaczete || false,
      skonczone: editedProject.skonczone || false,
      dostarczone: editedProject.dostarczone || false,
      wplacone: editedProject.wplacone || false,
      zamkniete: editedProject.zamkniete || false,
      tags: editedProject.tags || [],
      dateStart: editedProject.dateStart || new Date().toLocaleDateString(),
      dateTermin: editedProject.dateTermin || new Date().toLocaleDateString(),
      dateZakonczenie: editedProject.dateZakonczenie || new Date().toLocaleDateString(),
      disk: editedProject.disk || '',
      oldDisk: editedProject.disk || '',
      oldFiles: editedProject.files || [],
    })
    setDataMap({
      mapCoords: editedProject.mapCoords || [],
      color: editedProject.color || '#ff00ff'
    })
  }, [editedProject])

  const deleteOldUploadedFile = (indexDelete) => {

    setData((prevState) => {
 
      return {
        ...prevState,
        oldFiles: data.oldFiles.filter((item,i) => { return (i !== indexDelete)})
      }
    })
  }

  //HANDLE SEND ALL DATA
  const handleSetData = (e) => {

    setData((prevState) => {
      return {...prevState, [e.name]: e.value}
    })
  }


  //checking if date is not wrong
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  //SET DATE STORAGE
  const handleDates = (newValue, name) => {
    if(newValue === undefined || newValue === null || newValue === 0 || newValue === '0') {
      setData((prevState) => {
        return {
          ...prevState,
          [name] : '0'
        }
      })
    } else if (isValidDate(newValue)) {

      setData((prevState) => {
        return {
          ...prevState,
          [name] : newValue
        }
      });
    }
  };

    //SET CHECKBOXES
      //HANDLE SEND ALL DATA
    const handleCheckboxes = (e) => {

      setData((prevState) => {
        return {
          ...prevState,
          [e]: !data[e]
        }
      })
  }

  //HANDLE TAGS
  const handleTags = (tags) => {
    setData((prevState) => {
      return {
        ...prevState,
        tagi: tags
      }
    })
  }

  //HANDLE Client / tags
  const handleAutocomplete = (value, key) => {
    setData((prevState) => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  /////////////////////////////////////////////////////////////// FILE UPLOAD ////////////////////////
   //array with uploaded files
   const [filesUploaded ,setFilesUploaded] = useState([]);

   function deleteUploadedFile(indexDelete) {
     setFilesUploaded((prevState) => {
 
       return (
         prevState.filter((item,i) => { return (i !== indexDelete)})
       )
     })
   }

     //HANDLE RADIO INPUT
  const handleRadio = (value) => {
    setData((prevState) => {
      return {
        ...prevState,
        disk : value
      }
    })
  }

  ////////////////////////////////////////////// DATA HANDLE END / SENDING DATA NOW

//SENDING DATA =============
const handleSubmit = () => {
  // console.log({...data, ...dataMap, files: filesUploaded})


  // THROW ERROR IF NAMES NOT FILLED
  if ( data.name === '') {
    toggleErrorDialog('Pole NAZWA i KLIENT muszą zostać wypełnione poprawnie.')
    return
  } else if (filesUploaded.length > 0 && data.disk === '') {
    toggleErrorDialog('Wybierz dysk na którym projekt ma zostać zapisany.')
    return

    //THIS IS THE 'NO FILES UPLOADED, LET ME UPLOAD LATER OPTION
  } else if (filesUploaded.length === 0 && data.disk === '') {
    // SEND DATA
    axios({
      method: 'patch',
      url: `http://localhost:3001/projects/update/${editedProject._id}`,
      data: {...data, ...dataMap, files: filesUploaded}

    }).then((response) => {
      console.log(response)
    })

    //CLEAN UP
    setData({
      name: '',
      client: '',
      // dateStart: '',
      // dateTermin: '',
      // dateZakonczenie: '',
      doZaplaty: '',
      numberProjektu: '',
      zaczete: false,
      skonczone: false,
      dostarczone: false,
      wplacone: false,
      zamkniete: false,
      tags: [],
      dateStart: new Date().toLocaleDateString(),
      dateTermin: new Date().toLocaleDateString(),
      dateZakonczenie: new Date().toLocaleDateString(),
      disk: ''
    });
    setDataMap({
      mapCoords: [],
      color: '#ff00ff'
    });
    setFilesUploaded([]);
    setOpen(false)

    //REFRESH PAGE
    navigate(0)
    return
  }


   // HERE CHECK DISK + FILES SIZES
  let fileSize = 0;

  //TO NOT REPEAT IT TWICE, WE'RE MAKING ONE FUNCTION TO CONTROL FILE SIZE AND ADD IT TO fileSize variable
  function addToFileSize(item) {
    const split = item.size.split(' ');
    // MERGE ALL FILE SIZES INTO ONE IN GIGABYTES
    if (split[1] === 'kB') {
      fileSize += (Number(split[0]) * 0.000001)
    } else if (split[1] === 'mB') {
      fileSize += (Number(split[0]) * 0.001)
    } else if (split[1] === 'gB') {
      fileSize += (Number(split[0]))
    }
  }

  //WE WILL SEND IT IN GB
  filesUploaded.forEach((item) => {
    addToFileSize(item);
    
  })

  //FIND THE HARD DRIVE FROM THE ONLINE ONES
  const chosenDisk = diskCheck.find(obj => {
    return obj.diskName === data.disk
  })

  const chosenDiskSpace = chosenDisk.available.split(' ');

  ///////////////////////////////////////
  ////////////////////////CHECK IF THERE'S ENOUGH SPACE ON DISK
  ///////////////////////////////////////

  if (chosenDiskSpace[1] === 'GB' && Number(chosenDiskSpace[0]) > fileSize.toFixed(3)) {
    console.log('It passed, disk space is OK!')
    // SEND DATA
    axios({
      method: 'patch',
      url: `http://localhost:3001/projects/update/${editedProject._id}`,
      data: {...data, ...dataMap, files: filesUploaded}

    }).then((response) => {
      console.log(response)
    })
    
    // CLEAN UP
    setData({
      name: '',
      client: '',
      // dateStart: '',
      // dateTermin: '',
      // dateZakonczenie: '',
      doZaplaty: '',
      numberProjektu: '',
      zaczete: false,
      skonczone: false,
      dostarczone: false,
      wplacone: false,
      zamkniete: false,
      tags: [],
      dateStart: new Date().toLocaleDateString(),
      dateTermin: new Date().toLocaleDateString(),
      dateZakonczenie: new Date().toLocaleDateString(),
      disk: ''
    });
    setDataMap({
      mapCoords: [],
      color: '#ff00ff'
    });
    setFilesUploaded([]);
    setOpen(false)

    //REFRESH PAGE
    navigate(0)

  } else {
    toggleErrorDialog('Wybrany dysk prawdopodobnie ma za mało wolnego miejsca do użytku.')
    return
  }
}


  //USEEFFECT FOR GETTING POTENTIAL CLIENT'S INFO + DISK SPACE
  const [clients, setClients] = useState(['']);
  const [diskCheck, setDiskCheck] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/clients/all/namesonly'
    }).then(response => {
      setClients(response.data.map((item) => {
        return `${item.title} (ID:${item._id})`
      }))
    })

    axios({
      method: 'get',
      url: 'http://localhost:3001/drives'
    }).then(response => {
      setDiskCheck(response.data)
    })
  }, [])

  //HANDLING BAD/NO INPUT
  const [errorDialog, toggleErrorDialog] = useState('');

  return (
    <>
    <Modal open={editProject} onClose={() => {toggleEditProject(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
      <Box sx={{width: '1600px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', margin: 'auto', border: '1px solid red', background: 'white', height: '900px', scrollbarWidth: 'none', "&::WebkitScrollbar": 'none', overflowY: 'scroll'}}>
      <ErrorDialog errorDialog={errorDialog} toggleErrorDialog={toggleErrorDialog} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant='h4' sx={{p: '15px 25px 0', fontSize: '2rem', fontWeight: 'bold'}}>EDYCJA PROJEKTU</Typography>
          <Typography variant='h4' sx={{p: '0 25px 0', fontSize: '1rem', fontWeight: 'bold'}}>NIEKTÓRE POLA ZOSTAJĄ PUSTE, MIMO ŻE OFICJALNIE MAJĄ PRZYPISANĄ WARTOŚĆ.</Typography>
              <Stack direction='row' gap={2}>
                  <Paper elevation={6} sx={{ flex : 1, p: 2}}>
                      <Typography variant='h5' fontWeight='bold' sx={{my:1}}>Nazwa projektu:</Typography>
                      <TextField value={data.name} onChange={(e) => { handleSetData(e.target)}} id="filled-basic" label="Filled" type='string' name='name' variant="filled" fullWidth/>
                      <Typography variant='h5' fontWeight='bold' sx={{my:1}}>Klient: <span style={{fontSize: '1rem'}}></span></Typography>
                      <Stack direction='row' gap={2}>
                        {/* <Autocomplete onChange={(event, newValue) => {handleAutocomplete(newValue, 'client')}} isOptionEqualToValue={(option, value) => { return option.id === value.id}} disablePortal  id="combo-box-demo" options={clients} value={data.client} sx={{ width: 300 }} renderInput={(params) => <TextField onChange={(e) => handleSetData(e.target)} {...params} name='client' label="Klient" />} /> */}
                        <Autocomplete sx={{width: '350px'}} onChange={(event, newValue) => {handleAutocomplete(newValue, 'client')}}  options={clients} id="tags-filled" freeSolo renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                          }
                          renderInput={(params) => (
                          <TextField  {...params} variant="filled" label="Klient"  /> )} />
                        
                        <NewClient />
                        
                      </Stack>
                      <Stack direction='row' gap={2}>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '150px'}}>Data startu:</Typography>                
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '150px'}}>Termin:</Typography>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '200px'}}>Data zakończenia:</Typography>
                      </Stack>
                      <Stack direction='row' gap={2}>
                          <DatePicker inputFormat="DD/MM/YYYY"  value={data.dateStart} onChange={(newValue) => { handleDates(newValue.$d, 'dateStart'); }} renderInput={(params) => <TextField onChange={(e) => { console.log(e.target.value) }} sx={{width: '150px'}} {...params} />} />
                          {/* <TextField id="filled-basic" type='date' label="Filled" sx={{ width: '200px'}} variant="filled"/> */}
                          <DatePicker inputFormat="DD/MM/YYYY"  value={data.dateTermin} onChange={(newValue) => { handleDates(newValue.$d, 'dateTermin'); }} renderInput={(params) => <TextField sx={{width: '150px'}} {...params} />} />
                          {/* <Calendar /> */}
                          <DatePicker inputFormat="DD/MM/YYYY"  value={data.dateZakonczenie} onChange={(newValue) => { handleDates(newValue.$d, 'dateZakonczenie'); }} renderInput={(params) => <TextField sx={{width: '180px'}} {...params} />} />
                          
                          
                      </Stack>
                      <Typography sx={{ mt: 1 }}>Daty działają i można je zmieniać, ale przy kompletnym wykasowaniu, zwieszają system.*</Typography>
                      <Stack direction='row' gap={2}>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '130px'}}>Do zapłaty:</Typography>                
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '200px'}}>Numer projektu:</Typography>        

                          
                      </Stack>
                      <Stack direction='row' gap={2}>
                          <TextField  value={data.doZaplaty} id="filled-basic" label="Filled"  name='doZaplaty' onChange={(e) => {handleSetData(e.target)}} type='number' sx={{ width: '130px'}} variant="filled" />
                          <TextField  value={data.numberProjektu} id="filled-basic" label="Filled" name='numberProjektu' onChange={(e) => {handleSetData(e.target)}} type='number' sx={{ width: '180px'}} variant="filled" />

                          
                      </Stack>
                      <Stack direction='row' gap={2}>
                                        
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '100px'}}>Zaczęte?</Typography>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '130px'}}>Skończone?</Typography>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '150px'}}>Dostarczone?</Typography>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '120px'}}>Rozliczone?</Typography>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '110px'}}>Zamknięte?</Typography>
                          
                      </Stack>
                      <Stack direction='row' gap={2}>
                        <Checkbox name='zaczete' checked={data.zaczete} onChange={(e) => {handleCheckboxes(e.target.name)}}  sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }, width: '100px' }} />
                        <Checkbox name='skonczone' checked={data.skonczone} onChange={(e) => {handleCheckboxes(e.target.name)}}  sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }, width: '130px' }} />
                        <Checkbox name='dostarczone' checked={data.dostarczone} onChange={(e) => {handleCheckboxes(e.target.name)}}  sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }, width: '150px' }} />
                        <Checkbox name='wplacone' checked={data.wplacone} onChange={(e) => {handleCheckboxes(e.target.name)}}  sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }, width: '110px' }} />
                        <Checkbox name='zamkniete' checked={data.zamkniete} onChange={(e) => {handleCheckboxes(e.target.name)}}  sx={{ '& .MuiSvgIcon-root': { fontSize: 38 }, width: '110px' }} />
                          
                          
                      </Stack>
                      <Box>
                          <Typography variant='h5' fontWeight='bold' sx={{my:1, width: '160px'}}>TAGI / ULICE:<span style={{fontSize: '1rem'}}></span></Typography>     
                      </Box>
                      <Box>
                      <Autocomplete onChange={(event, newValue) => {handleAutocomplete(newValue, 'tags')}} multiple options={['kraków','maraton','ulica','bieg','gaz','nowohucka','borek']} id="tags-filled" freeSolo renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                          }
                          renderInput={(params) => (
                          <TextField  {...params} variant="filled" label="TAGI/ULICE" placeholder="Favorites" /> )} />
                      </Box>
                  </Paper>
                  <Paper className='newProjectMap' elevation={6} sx={{ flex: 1, p: 2}}>
                            <MapboxPolygonMaker centerArray={dataMap.mapCoords[0] } dataMap={dataMap} setDataMap={setDataMap} />
                  </Paper>
              </Stack>

              <Paper elevation={3} sx={{ p: 2, mt: 2,  position: 'relative'}}>
                  <Stack direction='row' gap={3} justifyContent={'flex-end'} sx={{ position: 'relative'}}>
                    <Button variant='contained' onClick={handleSubmit}>Zapisz Projekt</Button>
                    <Button onClick={handleClose}>Zamknij</Button>
                  </Stack>
                </Paper>

                {editedProject?.filesAreUploaded === true ? 
                <Typography variant='h5' sx={{p: 1, fontWeight: 'bold'}}>Pliki zostały już wgrane.</Typography> 
                :
                 (
                  <Paper elevation={6} sx={{ p: 2, mt: 2}}>
                <Typography variant='h5' sx={{display: 'inline-block'}}>Dodaj pliki:</Typography>
                


                
                <FileBase type='file' multiple={true} onDone={(files) => {console.log(files); setFilesUploaded(files)}}/>
                  <Paper elevation={3} sx={{ p: 2, mt: 2, width: '800px'}}>
                    {/* // PICK DRIVE TO SAVE ON */}
                    <Typography>Zapisz na dysku:</Typography>
                    <Typography>(Pozwól, aby na każdym dysku było minimum <span style={{fontWeight: 'bold'}}>50-80GB</span> wolnego miejsca, w razie problemów.)</Typography>
                    <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Wybrany obecnie dysk : {editedProject.disk}</span>
                    <RadioGroup onChange={(e) => {handleRadio(e.target.value)}} aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" >

                    {diskCheck && diskCheck.map((item, i) => {
                      return (
                        <RadioDiskCheck key={i} value={item.capacity} used={item.used} available={item.available} diskName={item.diskName} />
                      )
                    })}

                      
                    </RadioGroup>
                  </Paper>
                <Grid sx={{width: '100%', height: 'max-content', mt: 2, mx: 0, p:0,}} container rowSpacing={3} columnSpacing={3} columns={12}>
                    {/* ////////////// OLD FILES ////////////// */}
                  {data && data.oldFiles.map((item, i) => {
                    console.log(item)
                    return (
                      <Grid key={i} item xs={2}  sx={{p:'0 !important',}}>
                        <Paper elevation={3} sx={{ p: '0 !important', display: 'flex', p: 1, mx: 1, flexDirection: 'column', justifyContent:'center', alignItems: 'center',wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                          <UploadFileIcon />
                          <Typography sx={{textAlign: 'center'}}>{item.name}</Typography>
                          <Typography>{item.size}</Typography>
                          <Button onClick={() => {deleteOldUploadedFile(i)}} variant='contained'>Usuń</Button>
                        </Paper>
                      </Grid>
                    )
                  })}

                  {/* ////////////// NEW FILES ////////////// */}
                  { filesUploaded && filesUploaded.map((file,i) => {
                    return (
                      <Grid key={i} item xs={2}  sx={{p:'0 !important',}}>
                      <Paper elevation={3} sx={{ p: '0 !important', display: 'flex', p: 1, mx: 1, flexDirection: 'column', justifyContent:'center', alignItems: 'center',wordWrap: 'break-word', overflowWrap: 'break-word'}}>
                        <UploadFileIcon />
                        <Typography sx={{textAlign: 'center'}}>{file.name}</Typography>
                        <Typography>{file.size}</Typography>
                        <Button onClick={() => {deleteUploadedFile(i)}} variant='contained'>Usuń</Button>
                      </Paper>
                      </Grid>
                    )
                  })}
                  
                </Grid>
                
              </Paper>
                )}
              
              
          

        </LocalizationProvider>
        </Box>
      </Modal>
    </>
  );
}