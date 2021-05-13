import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/userReducer'
import { login, getUserFromToken } from './reducers/loginReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import LoggedUserInfo from './components/LoggedUserInfo'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)

  const match = useRouteMatch('/users/:id')

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initialiseUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [dispatch])

  const handleLogin = async (userObject) => {
    dispatch(login(userObject))
  }

  const user = match ? users.find((user) => user.id === match.params.id) : null

  return (
    <>
      <>
        <h1>Bloglist</h1>
        <Notification />
        {!loggedInUser ? (
          <LoginForm handleLogin={handleLogin} />
        ) : (
          <LoggedUserInfo />
        )}
      </>
      <Switch>
        <Route path='/users/:id'>{loggedInUser && <User user={user} />}</Route>
        <Route path='/users'>{loggedInUser && <UserList />}</Route>
        <Route path='/'>{loggedInUser && <BlogList />}</Route>
      </Switch>
    </>
  )
}

export default App
