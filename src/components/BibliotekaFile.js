import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import { Container, Box, Stack, Item, Button, TextField, Paper, Grid, Pagination, Typography, Breadcrumbs, Link, Divider  } from '@mui/material'

//ZROBIC TAKI isNotProjectFolder dla takich regułek inbetween, a projektowe ikonki do wyboru niech będą jakims specyficznym kolorem,
// Podział na rok i month

const BibliotekaFile = ({type,name,link, mimetype}) => {
  return (
    <Grid item xs={2} className='biblioteka-menu-item' sx={{ wordBreak: 'break-all'}}>
        <Stack direction='column' justifyContent={'center'} alignItems='center'>
            {type && 
                (type === 'pdf') ? <PictureAsPdfIcon />
                : (type === 'text') ? <FontDownloadIcon />
                : (type === 'folder') ? <FolderIcon />
                : (type === 'picture') ? <InsertPhotoIcon />
                : (type === 'movie') ? <VideoLibraryIcon />
                : (type === 'zip') ? <FolderZipIcon />
                : (type === 'goBack') ? <ReplyAllIcon style={{color: 'black'}} />
                : <DisabledByDefaultIcon />
                }
                <Typography variant='h5' sx={{textAlign:'center', fontSize: '1.2rem', fontWeight:'bold'}}>{name && name}{mimetype && '.' + mimetype}</Typography>
        </Stack>
    </Grid>
  )
}

export default BibliotekaFile