import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state
        .map((a) => (a.id !== id ? a : votedAnecdote))
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id },
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
