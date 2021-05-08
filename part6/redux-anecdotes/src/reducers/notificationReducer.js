const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content, timeAsSeconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: content,
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeAsSeconds * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
