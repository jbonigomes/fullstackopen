import React from 'react'
import ReactDOM from 'react-dom'

import Course from './Course'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        exercises: 10,
        name: 'Fundamentals of React',
      },
      {
        id: 2,
        exercises: 7,
        name: 'Using props to pass data',
      },
      {
        id: 3,
        exercises: 14,
        name: 'State of a component',
      },
      {
        id: 4,
        exercises: 11,
        name: 'Redux',
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
