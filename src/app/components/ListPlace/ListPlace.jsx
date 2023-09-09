import usePlaceAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox"
import "@reach/combobox/styles.css"
import './index.scss'


import React, { useState } from 'react'

export default function ListPlace({ setPlace }) {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlaceAutocomplete();
  const [solarInfo, setSolarInfo] = useState('');
  const [loading, setLoading] = useState(false)
  const clear = () => {
    setValue('');
    setSolarInfo('');
  }
  const handleSelect = async (val) => {
    setLoading(true);
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng })
    const solarRequest = await fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=` + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    const solarFormated = await solarRequest.json();
    setSolarInfo(solarFormated)
    setLoading(false)
  }

  return (
    <>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput value={value} onChange={e => setValue(e.target.value)} className="combobox-input" placeholder="Procure um endereço" />
        {value ? <button onClick={() => clear()}>🗑 Limpar</button> : <></>}
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      {solarInfo.error ? <div className='loading'>Não foi possivel carregar os dados para este endereço</div>
        :
        solarInfo.solarPotential ?
          <div className='solar-info-containers'>
            <h2 className='title-solar'>Solar infos for this address</h2>
            <span className='panels'>Max Panels Capacity : {solarInfo?.solarPotential?.maxArrayPanelsCount} Panels</span>
            <span className='sunshine'>Max Solar Hours/year: {Math.round(solarInfo?.solarPotential?.maxSunshineHoursPerYear)} Hours</span>
            <span className='energy'>Max Energy Capacity/year: {solarInfo?.solarPotential?.solarPanels[0].yearlyEnergyDcKwh}</span>
          </div>
          :
          loading && <div className='loading'>carregando informações aguarde um momento</div>


      }
      {!value ? <div className='loading'>Busque um endereço para verificar dados solares.</div> : <></>}
    </>
  )
}
