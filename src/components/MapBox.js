
import { Box, Button } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Polyline, Polygon, Rectangle, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useNavigate } from "react-router-dom";


// ON CLICK MAKE MARKER BUT SET THOSE VALUES INTO POLYGON LATER
function PolygonMaker({setPolygonPositions, polygonPositions}) {

    const map = useMapEvents({
        click(e) {
            console.log(e.latlng)
            setPolygonPositions(prevState => [...prevState, [e.latlng.lat, e.latlng.lng]])
            console.log(polygonPositions)
        }
    })
    return null
}

//HERE'S THE TRIAL AND ERROR MAGIC
// function MyComponent() {
//     const map = useMap()
    
//     // console.log(map.eachLayer(function(a) { console.log(a)}))
//     console.log(map.getContainer())
//     // console.log(map.eachLayer)
//     return null
//   }

const Mapbox = ({mapki, mapka, hideOneMap}) => {
    const Navigate = useNavigate();
    // console.log(mapki)



//     function checkTest() {
//         // console.log(mapka.targets)
//         if (typeof mapka === 'object' && mapka.current !== null) {
//             // const map = useMap()
//             // console.log('map center:', map.getCenter())
//     }
// }


  return (
    <>  

        <MapContainer  center={[50.061546997919635, 19.938642340428096]}  zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
        {/* // CREATE THE POLYGON */}
        {mapki && mapki.filter(item => {
            return item.isVisible ===true;
        }).map((item, i) => {

            return (
            <Polygon key={i} pathOptions={{color: item.color}} positions={item.mapCoords} >
                    <Tooltip sticky>
                        <p>{item.name}</p>
                        <p>{item.dateStart}</p>
                        <p>{item._id}</p>

                    </Tooltip>
                    <Popup sx={{display: 'flex !important', flexDirection: 'column !important'}}>
                        <Button onClick={() => {Navigate(`/projekty/${item._id}`)}} href='#' sx={{color: 'white !important'}} variant='contained'>Link do projektu</Button>
                        <Button onClick={() => {hideOneMap(item._id)}} href='#'>Ukryj tą mape</Button>
                    </Popup>
                </Polygon>

                )
        })}
        {/* {mapki && mapki.filter(item => {
            return item.isVisible === true;
        }).map((item,i) => {

            return (
                <Polygon key={i} pathOptions={{color: item.color}} positions={item.coords} >
                    <Tooltip sticky>
                        <p>{item.name}</p>
                        <p>{item.projektDate}</p>
                        <p>{item.projektId}</p>
                        <p>C/Projekty/2022/maj/</p>
                    </Tooltip>
                    <Popup>
                        <a href='#'>Link do projektu</a>
                    </Popup>
                </Polygon>
            )
        })} */}

        {mapka &&  (
            <Polygon pathOptions={{color: mapka.color}} positions={mapka.mapCoords} >
                    <Tooltip sticky>
                        <p>{mapka.name}</p>
                        <p>{mapka.dateStart}</p>
                        <p>{mapka._id}</p>
                        
                    </Tooltip>

                </Polygon>
        )}
        {/* <MyComponent /> */}
        </MapContainer>
    </>

     

  )
}

export default Mapbox