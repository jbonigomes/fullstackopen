import React from 'react'

export default ({ parts }) => (
  <b>
    total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises
  </b>
)
