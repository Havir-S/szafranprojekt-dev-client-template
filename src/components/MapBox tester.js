
import { Box } from '@mui/material';
import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Polyline, Polygon, Rectangle } from 'react-leaflet'
import L from 'leaflet'

function LocationMarker() {
    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
     
     const map = useMapEvents({
       click(e) {
        console.log(e)
         map.locate()
       },
       locationfound(e) {
        //  const { lat, lng } = e.latlng;
        //     setPosition({
        //        latitude: lat,
        //        longitude: lng,
        //      })
        //  map.flyTo(e.latlng, map.getZoom())
       },
     })
   
     return (
         position.latitude !== 0 ? 
         <Marker 
           position={[position.latitude, position.longitude]}
           interactive={false} 
           />
   
          : null
     )   
     
   }

   // ON CLICK MAKE MARKER
function LocationMaker({setPositions, positions}) {

    const map = useMapEvents({
        click(e) {
            console.log(e.latlng)
            setPositions(prevState => [...prevState, {lat: e.latlng.lat, lng: e.latlng.lng}])
            console.log(positions)
        }
    })
    return null
}

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

const Mapbox = () => {


const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

const polygon = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }

    function handleMap(e) {
        console.log(e)
    }

    // function tutorialHandleMap() {
    //     const map = useMapEvents({
    //         click() {
    //             console.log('ding')
    //         }
    //     })
    // }


    // ADDING NEW MARKERS WITH INPUTS
    const [positions, setPositions] = useState([{lat: 51.504, lng: -0.09}]);
    const [newPositions, setNewPositions] = useState({lat: 0, lng: 0})

    const handleNewPos = (e) => {
        // console.log(newPositions)
        setNewPositions((prevState) => {return {...prevState, [e.target.name]: e.target.value}})
    }

    const addNewPos = (val) => {
        setPositions((prevState) => {
            console.log(prevState)
            return [...prevState, newPositions]
        })
    }

    // ADDING NEW MARKERS ON CLICK ENABLE/DISABLE
    const [createMarkerOnClick, toggleCreateMarkerOnClick] = useState(false);
    const [polygonCreator, togglePolygonCreator] = useState(false);

    //POLYGON COORDS STACKING
    const [polygonPositions, setPolygonPositions] = useState([]);

    const deletePolygonPos = (indexToDelete) => {
        // console.log(indexToDelete)
        setPolygonPositions(prevState => {
            return prevState.filter((item,i) => {
                console.log(item, i)
                return (indexToDelete !== i)
            })
        })
    }

  return (
    <>
        <input type='number' placeholder='lat' onChange={(e) => handleNewPos(e)} name='lat' />
        <input type='number' placeholder='lng' onChange={(e) => handleNewPos(e)} name='lon' />
        <button onClick={addNewPos}>Add new position</button>
        <hr />
        <span>Create markers on click?</span>
        <button onClick={() => {toggleCreateMarkerOnClick(prevState => !prevState)}}>{createMarkerOnClick ? 'DISABLE' : 'ENABLE'}</button>
        <hr />
        <span>Create polygons on click?</span>
        <button onClick={() => {togglePolygonCreator(prevState => !prevState)}}>{polygonCreator ? 'DISABLE' : 'ENABLE'}</button>
        <button>Fill polygon</button>
        <hr />
        <p>Polygon coords:</p>
        {polygonPositions.map((polygonPos,i) => {
            return (
                <div key={i}>
                    <span>{polygonPos[0].toString().slice(0,6) + ' , ' + polygonPos[1].toString().slice(0,6)}</span>
                    <button onClick={() => {deletePolygonPos(i)}}>Delete</button>
                </div>
                )
            
        })}



        <MapContainer center={[51.505, -0.09]}  zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* // JUST SHOWS COORDS */}
        {/* <LocationMarker /> */}

        {/* // CREATE MARKER */}
        {createMarkerOnClick ? <LocationMaker positions={positions} setPositions={setPositions} /> : ''}

        {/* // POLYGON MARKER CREATOR */}
        {polygonCreator ? <PolygonMaker polygonPositions={polygonPositions} setPolygonPositions={setPolygonPositions} /> : ''}
        
        {/* // CREATE THE POLYGON */}
        {polygonPositions.length > 0 ? (<Polygon pathOptions={purpleOptions} positions={polygonPositions} />) : ''}

        {/* // SPAWN MARKERS */}
        {positions.map((newMark, i) => {
            return (
                <Marker key={i} position={[newMark.lat, newMark.lng]}>
                    <Popup>
                    HELLO FREN
                    </Popup>
                </Marker>
            )
        }) }


        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>


        <Polyline pathOptions={limeOptions} positions={polyline} />
       <Polyline pathOptions={limeOptions} positions={multiPolyline} />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
        <Rectangle bounds={rectangle} pathOptions={blackOptions} />

        </MapContainer>
    </>

     

  )
}

export default Mapbox