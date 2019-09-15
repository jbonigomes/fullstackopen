import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Error from './Error'
import Filter from './Filter'
import Persons from './Persons'
import Success from './Success'
import PersonForm from './PersonForm'

import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from './services/persons'

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')

  useEffect(() => {
    getPersons().then(persons => setPersons(persons))
  }, [])

  const getErrorMessage = (name) =>
    `Information of ${name} has already been removed from server`

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const msg = `
      is already added to the phonebook, replace the old number with a new one?
    `

    const exist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (exist) {
      if (window.confirm(`${newName} ${msg}`)) {
        updatePerson(exist.id, { name: exist.name, number: newNumber })
          .then((res) => {
            setPersons(persons.map((prs) => res.id === prs.id ? res : prs))

            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${newName}`)
            setTimeout(() => setSuccessMessage(''), 5000)
          })
          .catch(() => {
            setErrorMessage(getErrorMessage(newName))
            setTimeout(() => setErrorMessage(''), 5000)
          })
      }
    } else {
      createPerson({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person))

          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${person.name}`)
          setTimeout(() => setSuccessMessage(''), 5000)
        })
        .catch(() => {
          setErrorMessage(getErrorMessage(newName))
          setTimeout(() => setErrorMessage(''), 5000)
        })
    }
  }

  const handleDelete = (personToDelete) => () => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((prs) => prs.id !== personToDelete.id))
          setSuccessMessage(`Deleted ${personToDelete.name}`)
          setTimeout(() => setSuccessMessage(''), 5000)
        })
        .catch(() => {
          setErrorMessage(getErrorMessage(personToDelete.name))
          setTimeout(() => setErrorMessage(''), 5000)
        })
    }
  }

  const personsToShow = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <>
      <h2>Phonebook</h2>

      {errorMessage && <Error message={errorMessage} />}
      {successMessage && <Success message={successMessage} />}

      <Filter value={search} onChange={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
