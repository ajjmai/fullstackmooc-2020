const initialState = { content: null, timer: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timer) {
        clearTimeout(state.timer)
      }
      return { content: action.data.content, timer: action.data.timer }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content, timeAsSeconds) => {
  return (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, timeAsSeconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, timer },
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
