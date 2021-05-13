import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'

const LoggedUserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('Logging out completed.', 'notification'))
    history.push('/')
  }

  return (
    <div>
      {user.name} is logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LoggedUserInfo
