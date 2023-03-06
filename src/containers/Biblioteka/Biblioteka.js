import React, {useState} from 'react'
import { Container, Box, Stack, Item, Button, TextField, Paper, Grid, Pagination, Typography, Breadcrumbs, Link, Divider  } from '@mui/material'


import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';


import { KlientCard, MultiSelect, BibliotekaFile } from '../../components';
import { images } from '../../constants';

const Biblioteka = () => {
    const [widok,setWidok] = useState(true)

    const [searchOptions, setSearchOptions] = useState({});
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };



  return (
    <Container sx={{ p: 2, display: 'flex', flexDirection: 'column', gap:2}} maxWidth={false} >

        
        {/* <Pagination count={10} variant="outlined" shape="rounded" sx={{mt:2}} /> */}
        <Breadcrumbs aria-label="breadcrumb">
            <KeyboardBackspaceIcon sx={{fontSize: '2rem'}} />
            <Link underline="hover" color="inherit" href="/">
            Server
            </Link>
            <Link underline="hover" color="inherit" href="/material-ui/getting-started/installation/" >
            Dysk C
            </Link>
            <Link underline="hover" color="text.primary" href="/material-ui/react-breadcrumbs/" aria-current="page" >
            Projekty
            </Link>
        </Breadcrumbs>

        <Paper elevation={2} sx={{padding: 1, width:'max-content'}}>
        
            <Stack direction="row" spacing={2} alignItems='center'>
                <Typography variant='h5'>Widok:</Typography>
                <Stack  direction="row" alignItems='center' gap={.5}>
                    <ViewListIcon onClick={() => {setWidok(false)}} sx={{fontSize: (!widok ? '2rem' : '1.5rem'), color: (!widok ? '#1976D2' : 'black'), cursor: 'pointer', }} />
                    <GridViewIcon onClick={() => {setWidok(true)}} sx={{fontSize: (widok ? '2rem' : '1.5rem'), color: (widok ? '#1976D2' : 'black'), cursor: 'pointer', }} />
                    
                </Stack>
            </Stack>
        </Paper>

        <Paper elevation={2} sx={{padding: 3}}>
        
        <Stack direction="row" gap={1} alignItems={'center'}>
            <Stack direction="row"  alignItems='center'>
                <Typography variant='h5'>Nazwa pliku:</Typography>
                <TextField id="outlined-search" label="Szukaj..." type="search"  />
            </Stack>
            
            <Divider orientation="vertical" flexItem />
            <Stack direction="row"  alignItems='center' gap={1}>
                <Typography variant='h5'>Max ilość wyników:</Typography>
                <TextField id="outlined-search" type='number' sx={{width:'100px', textAlign: 'center'}} label="Szukaj..." />
                {/* <Button variant='outlined'>a</Button> */}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row"  alignItems='center' gap={1} sx={{width: '600px !important'}}>
                <Typography variant='h5'>Typy plików:</Typography>
                
                <MultiSelect />
            </Stack>
            
            <Stack direction="row" spacing={2}>
                <Box>
                    {/* <Button sx={{fontSize: '1.4rem', height: '100%'}} variant="contained"  startIcon={<AddBoxIcon size='large'  />}>
                        Znajdź plik
                    </Button> */}
                </Box>
                <Button sx={{fontSize: '1.2rem'}} variant="contained">
                    <SearchIcon sx={{fontSize: '1.8rem', mr: 1}}  />
                    Szukaj pliku
                </Button>

            </Stack>
            
        </Stack>
        <Divider  sx={{my: 2}} />
        <Box className='biblioteka-menu'>
            <Grid container justifyContent="flex-start" alignItems="flex-start" columns={15} gap={1} sx={{minHeight: '300px'}}>
                <BibliotekaFile name='DO TYŁU' type='goBack' />
                <BibliotekaFile name='STYCZEŃ' type='folder' />
                <BibliotekaFile name='LUTY' type='folder' />
                <BibliotekaFile name='MAJ' type='folder' />
                <BibliotekaFile name='CZERWIEC' type='folder' />
                <BibliotekaFile name='aaa' type='zip' mimetype='zip' />
                <BibliotekaFile name='aaa' type='text' mimetype='txt' />
                <BibliotekaFile name='MAPA STAROWIEJSKAAasdfsadfasdfsadfasdfdsfasdS' type='picture' mimetype='png' />
                <BibliotekaFile name='RONDO MATECZNEGO' type='movie' mimetype='mp4' />
                <BibliotekaFile name='aaa' type='text' mimetype='txt' />
                <BibliotekaFile name='aaa' type='text' mimetype='txt' />
                <BibliotekaFile name='aasdasdaa asf sadfdsafsa' type='text' mimetype='txt' />
            </Grid>
            
        </Box>
        
        </Paper>


    </Container>
  )
}

export default Biblioteka