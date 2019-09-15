import React from 'react'

export default ({ name, number, onDelete }) => (
  <div>
    {name} {number} <button onClick={onDelete}>delete</button>
  </div>
)
