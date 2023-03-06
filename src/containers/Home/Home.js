import { Container, Box, Typography, Paper } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {DataGridHome} from '../../components'
import React from 'react'
import {data} from '../../constants'

import { Link as RouterLink } from "react-router-dom";

const Home = () => {


  return (
    <Container sx={{ p: '0 !important'}} >
        <Box display='flex' gap='10px' height='max-content'>

            <Paper sx={{ width: '73%', padding: 1.5}} elevation={2}>
                <Typography variant='h5' color='primary' sx={{mb: 1}} fontWeight={'bold'}>Today</Typography>
                <LineChart
                width={830}
                height={270}
                data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Ten miesiąc" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Poprzedni miesiąc" stroke="#82ca9d" />
                </LineChart>
            </Paper>

            <Paper sx={{ width: '27%', padding: 1.5, display: 'flex', flexDirection: 'column'}} elevation={2}>
                <Typography variant='h5' color='primary' fontWeight={'bold'}>Ostatni projekt</Typography>
                <Typography variant='h3'  sx={{ mt:1}}>3024.00zł</Typography>
                <Typography variant='h5' color='#777'>15 Marzec 2022</Typography>
                <Box display='flex' justifyContent={'space-between'} alignItems={'flex-end'} sx={{ width:'100%', mb: 1, height: '100%'}}>
                    <Typography  variant='h5' fontSize={'1.3rem'} sx={{textDecoration: 'underline', cursor:'pointer'}} color='primary'>Sprawdź balans</Typography>
                    <Typography variant='h5' fontSize={'1.3rem'} sx={{ cursor:'pointer'}} color='#777'>Sprawdź projekt</Typography>
                </Box>
            </Paper>
        </Box>

        {/* <Typography variant='h5' color='primary' sx={{mb: 1}} fontWeight={'bold'}>ZROBIĆ HASŁO PRZY LOGOWANIU NAWET PROSTE BYLEBY DZIECI NIE WESZLY NA STRONE</Typography> */}
        {/* <Typography variant='h5' color='primary' sx={{mb: 1}} fontWeight={'bold'}>MZOE SZYBKA EDYCJA PROJEKTU Z TEJ STRONY I SAVE I INTEL FLOW DO SERWERA STĄD</Typography> */}

        <Paper sx={{mt: 4, padding: 1.5}}>
            <Typography variant='h5' color='primary' sx={{mb: 1}} fontWeight={'bold'}>Najnowsze Projekty</Typography>
            <DataGridHome />
            <RouterLink to='/'>
                <Typography variant='h5' fontSize={'1rem'} color='primary' sx={{mt: 1}} fontWeight={'bold'}>Pokaż wszystkie</Typography>
            </RouterLink>
        </Paper>

    </Container>
  )
}

export default Home