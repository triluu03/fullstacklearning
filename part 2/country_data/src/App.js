import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
  if (props.show.length > 1 && props.show.length <= 10) {
    return (
      <ul>
        {props.show.map(country => 
          <li key={country.name.official}>{country.name.common} <button value={country.name.common} type='button' onClick={props.onClick}>show</button></li>)}
      </ul>
    )
  } else if (props.show.length === 1) {
    const country = props.show[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        Capital: {country.capital[0]} <br />
        Population: {country.population}
        <h2>Spoken languages</h2>
        <ul>
          {Object.values(country.languages).map(lang => 
            <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  } else if (props.show.length === 0) {
    return (
      <div>No countries match the filter</div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const Weather = (props) => {
  if (props.show.length === 1) {
    const country = props.show[0]
    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
  

const App = () => {
  const [country, setCountry] = useState([])
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const country_data = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountry(response.data)
      })
  }
  useEffect(country_data, [])

  const weather_data = () => {
    axios
      .get('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=cbf9b8a46bd33dc75a85e3c775e2d341')
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(weather_data, [])
  console.log(weather)

  const countryToShow = country.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      <div>find countries <input value={search} onChange={handleSearch}/></div>
      <Countries show={countryToShow} onClick={(event) => setSearch(event.target.value)}/>
    </div>
  )
}

export default App
