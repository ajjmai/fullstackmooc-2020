import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
