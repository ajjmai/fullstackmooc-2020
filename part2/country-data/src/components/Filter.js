import React from 'react'

const Filter = ({ filterBy, filterCountries }) => {
  return (
    <div>
      find countries <input value={filterBy} onChange={filterCountries} />
    </div>
  )
}

export default Filter
