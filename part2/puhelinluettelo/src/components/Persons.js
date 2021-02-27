import React from 'react'
import personService from '../services/persons'
import Person from './Person'

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id)

    if (window.confirm(`Delete ${person}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleDelete={() => handleDelete(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons
