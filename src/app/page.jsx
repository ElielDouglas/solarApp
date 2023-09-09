'use client'
import './global.scss'

import Map from "./components/Map/Map";
import ListAdress from './components/ListAdress/ListAdress';
import { useLoadScript } from "@react-google-maps/api";




export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  if (!isLoaded) return <div>loading...</div>

  return (
    <>
      <Map />

    </>)
}
