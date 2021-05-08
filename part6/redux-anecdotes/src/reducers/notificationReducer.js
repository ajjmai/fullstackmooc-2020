const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.notification
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET',
    notification: content,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
  }
}

export default notificationReducer
