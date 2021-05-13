import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initialiseBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { login, logout, getUserFromToken } from './reducers/loginReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUserFromToken())
  }, [])

  const handleLogin = async (userObject) => {
    dispatch(login(userObject))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification('Logging out completed.', 'notification'))
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blogObject))
      dispatch(
        setNotification(
          `A new blog ${blogObject.title} by ${blogObject.author} added!`,
          'notification'
        )
      )
    } catch (exeption) {
      dispatch(setNotification('Adding blog failed.', 'error'))
    }
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

  const bloglist = () => (
    <>
      <div>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>Blogs</h2>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          loggedInUsername={user.username}
          removeBlog={removeBlog}
          own={user.id === blog.user.id || user.id === blog.user}
        />
      ))}
    </>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />
      {!user ? <LoginForm handleLogin={handleLogin} /> : bloglist()}
    </div>
  )
}

export default App
