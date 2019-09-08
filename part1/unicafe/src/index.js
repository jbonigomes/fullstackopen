import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

  const getPositive = () => good * 100 / all
  const getAverage = () => (good - bad) / all

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handlebad}>bad</button>

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {getAverage()}</div>
      <div>positive {getPositive()} %</div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
