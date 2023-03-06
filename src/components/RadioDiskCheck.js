import React from 'react'
import {Stack,Typography, } from '@mui/material/'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgressWithLabel from './LinearProgressWithLabel.js'


const RadioDiskCheck = ({value, used, available, diskName}) => {
    
  return (
    <Stack direction='row' justifyContent={'flex-start'} alignItems={'center'}>
        <FormControlLabel value={diskName}  sx={{m: 0}}  control={<Radio/>} />
        <Typography sx={{display: 'inline', width: '70px'}}>Disk: <strong>{diskName}</strong></Typography>
        <LinearProgressWithLabel value={Number(value)}/>
        <Typography sx={{width: '300px'}}>Wolne: <strong>{available}</strong> Zajęte: <strong>{used}</strong></Typography>
    </Stack>
  )
}

export default RadioDiskCheck

