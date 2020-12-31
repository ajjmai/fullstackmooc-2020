import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <Stat number={good} text='good' />
      <Stat number={neutral} text='neutral' />
      <Stat number={bad} text='bad' />
      <Stat number={total} text='all' />
      <Stat number={average} text='average' />
      <p>positive {positive} %</p>
    </>
  )
}

const Stat = ({ text, number }) => (
  <p>
    {text} {number}
  </p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => {
          setGood(good + 1)
        }}
        text='good'
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1)
        }}
        text='neutral'
      />
      <Button
        handleClick={() => {
          setBad(bad + 1)
        }}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
