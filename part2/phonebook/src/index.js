import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ persons, setPersons] = useState([{ name: 'Arto Hellas' }])

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      return alert(`${newName} is already added to the phonebook`)
    }

    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
