import React, { useEffect, useState } from 'react'

const Country = ({ country }) => {
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
    </>
  )
}

export default Country
