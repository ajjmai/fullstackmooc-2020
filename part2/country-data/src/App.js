import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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
    if (event.target.value) {
      setFilterBy(event.target.value)
    } else {
      setFilterBy('')
    }
  }

  const countriesToShow = countryData.filter((country) =>
    country.name.toLowerCase().includes(filterBy)
  )

  return (
    <div>
      <Filter filterBy={filterBy} filterCountries={filterCountries} />
      {countriesToShow.length < 10 && (
        <Countries countries={countriesToShow} setFilterBy={setFilterBy} />
      )}
      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter.</p>
      )}
    </div>
  )
}

export default App
