import React from 'react'

const Filter = ({ filterCountries }) => {
  return (
    <div>
      find countries <input onChange={filterCountries} />
    </div>
  )
}

export default Filter
