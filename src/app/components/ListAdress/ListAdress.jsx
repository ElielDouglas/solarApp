'use client'
import { useState } from 'react'
import './index.scss'
import usePlaceAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"

function ListItem({ adress, handleSelect }) {
  const [selected, setSelected] = useState(false);
  return (
    <div onClick={() => { handleSelect(adress), setSelected((prevState) => !prevState) }} className="item-container">
      <h2>{adress.description}</h2>
      <span className='description'>{adress.streetname}  Nº {adress.streetNumber}, {adress.neighbourhood} - {adress.city} - {adress.state}</span>
    </div>
  )
}
export default function ListAdress({ places, setPlace }) {
  const [oneSelected, setOneSelected] = useState(false)
  const [solarInfo, setSolarInfo] = useState('');



  const handleSelect = async (adress) => {

    setOneSelected(adress);
    let strToPanTo = `${adress.description} ${adress.streetName}, ${adress.streetNumber} - ${adress.neighbourhood}, ${adress.city} - ${adress.state}`



    const results = await getGeocode({ address: strToPanTo });

    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng })
    const solarRequest = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=` + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    const solarFormated = await solarRequest.json();
    setSolarInfo(solarFormated)
  }

  const clear = () => {
    setOneSelected('')
    setSolarInfo('')
  }
  console.log(solarInfo)
  return (
    <div >
      <h2 className='title'>Listagem de Endereços</h2>
      <ul className='container-all-adress'>
        {oneSelected ?
          <>
            <button className="back" onClick={() => clear()}>⬅️ Voltar para listagem</button>
            <ListItem adress={oneSelected} handleSelect={handleSelect} />
            {solarInfo.error ? <div className='loading'>Não foi possivel carregar os dados para este endereço</div>
              :
              solarInfo.solarPotential ?
                <div className='solar-info-container'>
                  <h2 className='title-solar'>Solar infos for this address</h2>
                  <span className='panels'>Max Panels Capacity : {solarInfo?.solarPotential?.maxArrayPanelsCount} Panels</span>
                  <span className='sunshine'>Max Solar Hours/year: {Math.round(solarInfo?.solarPotential?.maxSunshineHoursPerYear)} Hours</span>
                  <span className='energy'>Max Energy Capacity/year: {solarInfo?.solarPotential?.solarPanels[0].yearlyEnergyDcKwh}</span>
                </div>
                :
                <div className='loading'>carregando informações aguarde um momento</div>
            }
          </>
          :
          places && places.map((adress, index) => {
            return (
              <ListItem key={index} adress={adress} handleSelect={handleSelect} />
            )
          })

        }

      </ul>
    </div >
  )
};