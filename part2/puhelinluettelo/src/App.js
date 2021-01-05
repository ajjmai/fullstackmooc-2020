import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook!`)
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPersonObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    setFilterBy(event.target.value)
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterBy)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterBy} onChange={filterPersons} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
