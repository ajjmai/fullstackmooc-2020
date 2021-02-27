import React from 'react'
import Country from './Country'

const Countries = ({ countries, setFilterBy }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}{' '}
          <button
            onClick={() => {
              setFilterBy(country.name.toLowerCase())
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default Countries
