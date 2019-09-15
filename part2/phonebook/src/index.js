import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Filter from './Filter'
import Persons from './Persons'
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

  useEffect(() => {
    getPersons().then(persons => {
      setPersons(persons)
    })
  }, [])

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

    const exist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (exist) {
      if (window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )) {
        updatePerson(exist.id, { name: exist.name, number: newNumber }).then((res) => {
          setPersons(persons.map((person) => res.id === person.id ? res : person))
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      createPerson({ name: newName, number: newNumber }).then((person) => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (personToDelete) => () => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(personToDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id))
      })
    }
  }

  const personsToShow = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  return (
    <>
      <h2>Phonebook</h2>
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
