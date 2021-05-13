import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { initialiseBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initialiseUsers } from './reducers/userReducer'
import { login, getUserFromToken } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoggedUserInfo from './components/LoggedUserInfo'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

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

  const likeBlog = async (blogObject) => {
    const blogCreator = blogObject.user.id
      ? blogObject.user.id
      : blogObject.user
    try {
      dispatch(updateBlog(blogObject, blogCreator))
    } catch (exeption) {
      dispatch(setNotification('Updating blog failed.', 'error'))
    }
  }

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        dispatch(deleteBlog(blogToDelete.id))
        dispatch(
          setNotification(
            `Removed ${blogToDelete.title} by ${blogToDelete.author}.`,
            'notification'
          )
        )
      } catch (exeption) {
        dispatch(
          setNotification(
            `Removing ${blogToDelete.title} by ${blogToDelete.author} failed.`,
            'error'
          )
        )
      }
    }
  }

  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const nav = {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightGray',
  }

  const padding = {
    padding: 5,
  }

  return (
    <>
      <>
        <div style={nav}>
          <Link style={padding} to='/'>
            blogs
          </Link>
          <Link style={padding} to='/users'>
            users
          </Link>
          {loggedInUser && <LoggedUserInfo />}
        </div>
        <h1>Bloglist</h1>
        <Notification />
        {!loggedInUser && <LoginForm handleLogin={handleLogin} />}
      </>
      <Switch>
        <Route path='/users/:id'>{loggedInUser && <User user={user} />}</Route>
        <Route path='/users'>{loggedInUser && <UserList />}</Route>
        <Route path='/blogs/:id'>
          {loggedInUser && (
            <Blog
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              loggedInUserId={loggedInUser.id}
            />
          )}
        </Route>
        <Route path='/'>{loggedInUser && <BlogList />}</Route>
      </Switch>
    </>
  )
}

export default App
