import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { initialiseBlogs } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/userReducer'
import { login, getUserFromToken } from './reducers/loginReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import LoggedUserInfo from './components/LoggedUserInfo'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

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

  return (
    <Router>
      <>
        <h1>Bloglist</h1>
        <Notification />
        {!user ? <LoginForm handleLogin={handleLogin} /> : <LoggedUserInfo />}
      </>
      <Switch>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>{user && <BlogList />}</Route>
      </Switch>
    </Router>
  )
}

export default App
