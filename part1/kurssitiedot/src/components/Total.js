import React from 'react'

const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((a, c) => a + c)

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  )
}

export default Total
