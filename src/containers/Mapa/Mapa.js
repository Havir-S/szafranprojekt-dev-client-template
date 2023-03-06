import { Container, Box, Stack, Item, Button, TextField, Typography, Paper, Grid, Pagination } from '@mui/material'
import React, {useEffect, useState} from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { Mapbox } from '../../components';
import { images } from '../../constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Mapa = () => {
    const Navigate = useNavigate();
    const [mapki, setMapki] = useState([]);
    const [choosePoint, toggleChoosePoint] = useState(false);
    const [choosenPoint, setChoosenPoint] = useState([]);

    const changeVisibility = (indexChange) => {
        const newState = mapki.map((item,i) => {

            if (i === indexChange) {

                return {...item , isVisible:  !mapki[indexChange].isVisible}
            }

            return item
        })
        setMapki(newState)
    }

    useEffect(() => {
        axios({
          method: 'get',
          url: `http://localhost:3001/projects/allmaps`,
        }).then(response => {
          const serverMapsInfo = response.data;
          const upgradedServerMapsInfo = []

          serverMapsInfo.forEach((item) => {

            const newMapObject = {
                ...item,
                isVisible: true,
                dateStart: new Date(item.dateStart).toLocaleDateString('pl-PL')
            }
            upgradedServerMapsInfo.push(newMapObject)
            setMapki(upgradedServerMapsInfo)

          })

        })
      }, [])
  
      const showAll = () => {
        setMapki((prevState) => {
            console.log(prevState)
            
            return prevState.map((item) => {

                return {
                    ...item,
                    isVisible: true
                }
            })
        })
      }

      const hideAll = () => {
        setMapki((prevState) => {
            console.log(prevState)
            
            return prevState.map((item) => {

                return {
                    ...item,
                    isVisible: false
                }
            })
        })
      }

    const hideOneMap = (mapId) => {
        console.log(mapId)


        setMapki((prevState) => {
            return prevState.map((item, i) => {
                if (item._id === mapId) {
                    return {
                        ...item,
                        isVisible: false
                    }
                }
                return item
            })
        })
    }

  return (
    <Container sx={{ p: 2, display: 'flex', flexDirection: 'column',  height: '90vh'}} maxWidth={false} >
        {choosePoint ? 
            <Typography variant='h5' sx={{fontWeight:'bold', color: '#7B1FA2', textDecoration: 'underline', fontSize: '1.7rem', textAlign: 'center'}}>WYBIERZ PUNKT NA MAPIE</Typography>
            : ''
        }
        
        <Box sx={{ display: 'flex', flexDirection: 'row', gap:2, height: '90vh'}}>
            <Paper elevation={2} sx={{padding: 3, position: 'relative',width: '800px', display: 'inline-block'}}> 
            

                <Mapbox mapki={mapki} hideOneMap={hideOneMap} />


            </Paper>
            <Paper elevation={2} sx={{padding: 3, position: 'relative',width: '800px', display: 'inline-block', overflowY: 'scroll'}}> 
            
                <Typography variant='h5' sx={{mb: 1}}>Znajdź mapy:</Typography>
                <Stack direction="row">
                
                    <TextField id="outlined-search" label="Szukaj..." type="search"  />
                    <Button sx={{fontSize: '1.2rem'}} variant="contained">
                        <SearchIcon sx={{fontSize: '1.8rem', mr: 1}}  />
                        Szukaj 
                    </Button>
                </Stack>
                <Typography variant='h4' sx={{mt: 2}}>Użyte mapy:</Typography>
                <Stack direction="row" gap={1} sx={{my: 1}}>
                    <Button sx={{fontSize: '1rem'}} onClick={showAll} variant="contained">
                        Pokaż wszystkie
                    </Button>
                    <Button sx={{fontSize: '1rem'}} onClick={hideAll} variant="contained">
                        Ukryj wszystkie
                    </Button>
                    <Button onClick={() => {setChoosenPoint([]); toggleChoosePoint((prevState) => { return !prevState})}} sx={{fontSize: '1rem'}} color='secondary' variant="contained">
                        Wybierz punkt na mapie i szukaj
                    </Button>
                </Stack>
                <Stack direction="column" sx={{my: 1}}>
                {mapki.map((item,i) => {

                    return (
                        <Stack key={i} direction='row'  alignItems={'center'} sx={{"&:first-of-type": {borderTop: '2px solid #999'}, py:1, borderBottom: '2px solid #999', }} gap={.5}>
                            <Box sx={{height: '35px', width: '35px', background: item.color,}} />
                            <Typography variant='h5' sx={{fontWeight: 'bold',fontSize: '1.2rem', ml: 1, flex: 1}}>{item?.name}</Typography>
                            <Typography variant='h5' sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>{item?.dateStart}</Typography>
                            <Button>
                            {item.isVisible ? 
                                <VisibilityIcon sx={{fontSize:'3rem',}} onClick={() => {changeVisibility(i)}} />
                                :
                                <VisibilityOffIcon sx={{fontSize:'3rem',}} onClick={() => {changeVisibility(i)}} />
                            }
                                
                            </Button>
                            <Button variant="contained" onClick={() => {Navigate(`/projekty/${item._id}`)}}>
                                Odwiedź Projekt
                            </Button>
                        </Stack>
                    )
                })}
                </Stack>

            </Paper>
        </Box>


        {/* <Pagination count={10} variant="outlined" shape="rounded" sx={{mt:2}} /> */}
        
    </Container>
  )
}

export default Mapa