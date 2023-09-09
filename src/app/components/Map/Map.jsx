'use client'
import { useState, useMemo, useCallback, useRef, useEffect, } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer

} from "@react-google-maps/api"
import ListPlace from '../ListPlace/ListPlace';
import ListAdress from '../ListAdress/ListAdress';



export default function Map() {
  const [place, setPlace] = useState();
  const [places, setPlaces] = useState();
  const mapRef = useRef()
  const center = useMemo(() => ({ lat: -22.2159848, lng: -54.8054409 }), [])
  const options = useMemo(() => ({
    mapId: "6ff86e6e8e82861a",
    disableDefaultUI: true,
    clickableIcons: false
  }));
  useEffect(() => {
    fetch('https://challenge.solarpipe.com.br/addresses')
      .then((res) => res.json())
      .then((data) => setPlaces(data))

  }, [])
  const onLoad = useCallback((map) => (mapRef.current = map), []);


  return <div className='container'>
    <div className="controls">
      <h1>Buscar Endereço</h1>
      <ListPlace setPlace={(position) => {
        setPlace(position);
        mapRef.current?.panTo(position);
      }} />
      <ListAdress places={places} setPlace={(position) => {
        setPlace(position);
        mapRef.current?.panTo(position);
      }} />
    </div>
    <div className='map'>
      <GoogleMap
        zoom={20}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
      >
        {place && <Marker position={place} />}
      </GoogleMap>
    </div>
    {/* <div className="solar-info">
      <SolarInfo places={places} />
    </div> */}

  </div>
}
