import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [countryData, setCountryData] = useState([])
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios.get(url).then((response) => {
      setCountryData(response.data)
    })
  }, [])

  const filterCountries = (event) => {
    setFilterBy(event.target.value)
  }

  const countriesToShow = countryData.filter((country) =>
    country.name.toLowerCase().includes(filterBy)
  )

  return (
    <div>
      <Filter filterBy={filterBy} filterCountries={filterCountries} />
      {countriesToShow.length === 1 && <Country country={countriesToShow[0]} />}
      {countriesToShow.length < 10 && countriesToShow.length > 1 && (
        <Countries countries={countriesToShow} />
      )}
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
    </div>
  )
}

export default App
