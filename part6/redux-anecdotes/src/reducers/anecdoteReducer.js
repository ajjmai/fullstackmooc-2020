import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      return state
        .map((a) => (a.id !== action.data.id ? a : action.data))
        .sort(sortBasedOnVotes)
    case 'NEW_ANECDOTE':
      return [...state, action.data].sort(sortBasedOnVotes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

function sortBasedOnVotes(a, b) {
  return b.votes - a.votes
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote,
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote })
  }
}

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
