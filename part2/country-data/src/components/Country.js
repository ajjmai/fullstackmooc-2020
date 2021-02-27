import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ city, weather }) => {
  return (
    <>
      <h2>Weather in {city}</h2>
      <div>
        <img
          alt='weather-icon'
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      </div>
      <p>
        <strong>temperature:</strong> {Math.round(weather.main.temp)} Celsius
      </p>
      <p>
        <strong>wind: </strong> {weather.wind.speed} m/s
      </p>
    </>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const city = country.capital
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${api_key}&units=metric`
    // console.log(url)
    axios.get(url).then((response) => {
      // console.log(response.data)
      setWeather(response.data)
    })
  }, [country.capital])

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img width='150px' src={country.flag} alt={`flag of ${country.name}`} />
      {weather.name && <Weather city={country.capital} weather={weather} />}
    </>
  )
}

export default Country
