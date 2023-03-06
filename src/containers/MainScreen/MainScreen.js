import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
// import Home from '../Home/Home';
import {Home, Wiadomosci, Projekty, Klienci, Biblioteka, Mapa, Projekt} from '../'




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default function MainScreen() {
  const {pathname} =   useLocation();
  let title = '';
  switch(pathname) {
    case '/wiadomosci':
      title = 'Wiadomości';
    break;
    case '/home':
      title = 'Strona Główna';
    break;
    case '/projekty':
      title = 'Projekty';
    break;
    case '/klienci':
      title = 'Klienci';
    break;
    case '/biblioteka':
      title = 'Biblioteka';
    break;
    default:
      title = '';
    break;
  }
  console.log(pathname)

  return (
    <Box sx={{ width: '90%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }} >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit" >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box backgroundColor={'#f5f5f5'} width={'100%'} height={'93%'} >
        <Box sx={{p: '15px'}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/wiadomosci' element={<Wiadomosci />} />
 
            <Route path='/projekty' element={<Projekty />} />   
            <Route path='/projekty/:id' element={<Projekt />} />     
            <Route path='/klienci' element={<Navigate to='/klienci/all' />} />
            <Route path='/klienci/all' element={<Klienci />} />
            {/* <Route path="*" element={<Navigate to="/klienci/1" replace />} />       */}
            <Route path='/biblioteka' element={<Biblioteka />} />      
            <Route path='/mapa' element={<Mapa />} />      
            <Route path='*' element={<h1>aaaa</h1>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
