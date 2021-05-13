import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/loginReducer'

const LoggedUserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('Logging out completed.', 'notification'))
  }

  return (
    <div>
      {user.name} is logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LoggedUserInfo
