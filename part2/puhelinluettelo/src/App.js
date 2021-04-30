import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((person) => person.name === newName)

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : returnedPerson))
            )
            setNotificationMessage(`${newName}'s phone number was changed`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(
              `Information of ${newName} was already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter((person) => person.name !== newName))
          })
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error.response.data)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      <Notification message={notificationMessage} className='notification' />
      <Notification message={errorMessage} className='error' />
      <Filter filterBy={filterBy} filterPersons={filterPersons} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  )
}

export default App
