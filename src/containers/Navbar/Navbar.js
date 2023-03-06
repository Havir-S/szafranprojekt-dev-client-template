import React from 'react'
import { Box, Stack, Link, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import FolderIcon from '@mui/icons-material/Folder';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MapIcon from '@mui/icons-material/Map';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ width: '240px', borderRight: '1px solid #ccc'}}>
        <Box sx={{borderBottom: '1px solid #ccc', height: '63px', margin: '0 0px'}} />
        <Stack spacing={4} justifyContent="center" alignItems="flex-start" sx={{mt: 5,}}>
                <RouterLink to='/' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <HomeIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Dom</span>
                </Typography>
                </RouterLink>
                {/* <RouterLink to='/wiadomosci' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <MessageIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Wiadomości</span>
                </Typography>
                </RouterLink> */}
                <RouterLink to='/projekty' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <FolderIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Projekty</span>
                </Typography>
                </RouterLink>
                <RouterLink to='/klienci' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <GroupsIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Klienci</span>
                </Typography>
                </RouterLink>
                {/* <RouterLink to='/Biblioteka' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <LibraryBooksIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Biblioteka</span>
                </Typography>
                </RouterLink> */}
                <RouterLink to='/mapa' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <MapIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Mapa</span>
                </Typography>
                </RouterLink>
                <RouterLink to='/statystyki' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <BarChartIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Statystyki</span>
                </Typography>
                </RouterLink>
                <RouterLink to='/notatki' style={{textDecoration: 'none'}}>
                <Typography  variant={'h5'} sx={{"&:hover": {color: '#555', textDecoration: 'underline'}, textDecoration: 'none', cursor: 'pointer', color: '#777', fontWeight: 'medium', verticalAlign: 'middle', display: 'flex', width: 'max-content', justifyContent: 'space-between', alignContent: 'center'}}>
                    <EventNoteIcon sx={{ fontSize: '2rem', ml: 3, mr: 3}} />
                    <span>Notatki</span>
                </Typography>
                </RouterLink>
            
        </Stack>
    </Box>
  )
}

export default Navbar