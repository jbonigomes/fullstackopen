import React from 'react'
import ReactDOM from 'react-dom'

import Total from './Total'
import Header from './Header'
import Content from './Content'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      exercises: 10,
      name: 'Fundamentals of React',
    },
    {
      exercises: 7,
      name: 'Using props to pass data',
    },
    {
      exercises: 14,
      name: 'State of a component',
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
