import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Statistics from './Statistics'

const App = () => {
  const [all, setAll] = useState(0)
  const [bad, setBad] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handlebad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handlebad}>bad</button>
      <Statistics all={all} bad={bad} good={good} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
