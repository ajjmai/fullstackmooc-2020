import React from 'react'

const Filter = ({ filterBy, filterPersons }) => {
  return (
    <div>
      filter shown with <input value={filterBy} onChange={filterPersons} />
    </div>
  )
}

export default Filter
