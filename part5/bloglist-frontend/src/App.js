import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const loggedInUser = await loginService.login(userObject)
      setNotificationMessage(
        `Hello ${loggedInUser.name}! You have succesfully logged in.`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    } catch (exception) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setNotificationMessage('Logging out completed.')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setNotificationMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
    } catch (exeption) {
      setErrorMessage('Adding blog failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notificationMessage} className='notification' />
      <Notification message={errorMessage} className='error' />
      {!user ? <LoginForm handleLogin={handleLogin} /> : bloglist()}
    </div>
  )
}

export default App
