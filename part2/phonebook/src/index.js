import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = () => {
  const initialPersons = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]

  const [ search, setSearch ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ persons, setPersons] = useState(initialPersons)

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

    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already added to the phonebook`)
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
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
      <Persons persons={personsToShow} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
