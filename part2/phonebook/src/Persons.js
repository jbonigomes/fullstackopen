import React from 'react'
import Person from './Person'

export default ({ persons }) => (
  <>
    {persons.map((person) => (
      <Person key={person.name} name={person.name} number={person.number} />
    ))}
  </>
)
