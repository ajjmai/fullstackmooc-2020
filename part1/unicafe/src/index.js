import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Stat = ({ text, count }) => (
  <p>
    {text} {count}
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
      <Stat count={good} text='good' />
      <Stat count={neutral} text='neutral' />
      <Stat count={bad} text='bad' />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
