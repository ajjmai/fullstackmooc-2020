import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <form onSubmit={addNew}>
      <div>
        <input name='anecdote' />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
