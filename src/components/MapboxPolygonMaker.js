
import { Box, Stack, Typography, Button } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Polyline, Polygon, Rectangle, Tooltip,  } from 'react-leaflet'
import { SketchPicker } from 'react-color';


// ON CLICK MAKE MARKER BUT SET THOSE VALUES INTO POLYGON LATER
function PolygonMaker({handleMapCoords }) {

    const map = useMapEvents({
        click(e) {
            //SENDING COORDS FROM THIS CLICK EVENT

            handleMapCoords([e.latlng.lat, e.latlng.lng])

        }
    })
    return null
}

const MapboxPolygonMaker = ({dataMap, setDataMap, centerArray}) => {
    // console.log(mapki)

    /// COLOR FINDER
    const [showPolygonColorPicker, toggleShowPolygonColorPicker] = useState(false);



    //IF ON - STARTS CREATING POLYGON ON CLICK
    const [polygonCreator, togglePolygonCreator] = useState(false);

    const handleDeleteLastPolygon = () => {
        setDataMap((prevState) => {
            return {
                ...prevState, 
                mapCoords: prevState.mapCoords.filter((item,i) => { return prevState.mapCoords.indexOf(item) !== (prevState.mapCoords.length - 1)})
            }
        })
    }

    //WHEN CLICKING THE [X] BUTTON, SPECIFIED POINT OF POLYGON GETS DELETED
    const handleDeletePolygon = (indexToDelete) => {
        
        // console.log(indexToDelete)
        setDataMap((prevState) => {
            return {
                ...prevState,
                mapCoords: prevState.mapCoords.filter((item, i) => i !== indexToDelete)
            }

            return prevState
        })
    }

    //ADD COORDS TO MAP
    const handleMapCoords = (value) => {

        setDataMap((prevState) => {
            return {
                ...prevState,
                mapCoords: [...prevState.mapCoords, value]
            }
        })
    }

    const handleMapColor = (value) => {
        setDataMap(prevState => { return {
            ...prevState,
            color: value
        }})
    }
    
  return (
    <>
        <Stack direction='row' alignItems='center' justifyContent={'space-between'} sx={{marginBottom: '5px', position: 'relative'}}>
            <Stack direction='row' alignItems='center' gap={1}>
                <Typography sx={{display: 'inline'}}>Zacznij zaznaczać punkty na mapie?</Typography>
                <Button variant='contained' sx={{padding: '0 5px', fontSize: '1.1rem'}} onClick={() => {togglePolygonCreator(prevState => !prevState)}}>{polygonCreator ? 'WYŁĄCZ' : 'WŁĄCZ'}</Button>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1}>
                <Typography sx={{display: 'inline'}}>Obecnie wybrany kolor: <span style={{fontWeight: 'bold', padding: '5px', borderRadius: '10px', backgroundColor: (dataMap.color ? dataMap.color : '')}}>{dataMap.color}</span></Typography>
                <Button variant='contained' sx={{padding: '0 5px', fontSize: '1.1rem'}} onClick={() => {toggleShowPolygonColorPicker(prevState => !prevState)}}>ZMIEŃ</Button>
            </Stack>
            <Box sx={{position: 'absolute', right: 5, top: '115%', zIndex: '10'}}>
                {/* //SHOW COLOR PICKER */}
                {showPolygonColorPicker && <SketchPicker color={dataMap.color} onChange={(color) => {handleMapColor(color.hex)}}/>}
                
            </Box>
        </Stack>

       
       <Stack direction='row'  sx={{height: '100%', position: 'relative', zIndex: '0'}}>
            {/* MAP WITH EVERYTHING */}
            <MapContainer center={centerArray || [50.061546997919635, 19.938642340428096]}  zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {dataMap.mapCoords && (
                    <Polygon pathOptions={{color: dataMap.color}} positions={dataMap.mapCoords} >
                        <Tooltip sticky>sticky Tooltip for Polygon</Tooltip>
                    </Polygon>
                    
                    )}

                    {polygonCreator ? 
                        <PolygonMaker handleMapCoords={handleMapCoords} polygonPositions={dataMap.mapCoords} />
                        : ''
                    }

            </MapContainer>
            <Stack direction='column' sx={{flex: 1}}>
                <Box sx={{height: '500px',border: '2px solid rgb(123, 31, 122)', background: 'rgb(123, 31, 162)', color: 'white', padding: '2px',  overflow: 'auto'}}>
                    <Typography sx={{textAlign: 'center'}}>Koordynaty:</Typography>
                        {dataMap.mapCoords.map((polygonPos,i) => {

                            return (
                                <Box key={i} sx={{padding: '6px 0', borderTop: '3px solid rgb(143, 61, 192)'}}> 
                                    <Typography sx={{fontSize: '.8rem', display: 'inline-block'}}>{polygonPos[0].toString().slice(0,6) + ' , ' + polygonPos[1].toString().slice(0,6)}</Typography>
                                    <Button variant="contained" color='error' sx={{ padding: '5px 8px', ml: '3px', minWidth: 0, display: 'inline-block'}} onClick={() => {handleDeletePolygon(i)}}>X</Button>
                                </Box>
                                )
                            })
                        }
                </Box>
                <Button variant='contained' sx={{padding: '0 5px', fontSize: '1.1rem'}} onClick={() => {handleDeleteLastPolygon()}}>Usuń ostatni zrobiony punkt</Button>
            </Stack>
       </Stack>

        
    </>

     

  )
}

export default MapboxPolygonMaker