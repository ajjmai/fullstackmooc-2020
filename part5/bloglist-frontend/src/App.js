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

  function sortBlogs(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    async function fetchBlogs() {
      const returnedBlogs = await blogService.getAll()
      setBlogs(returnedBlogs.sort(sortBlogs))
    }
    fetchBlogs()
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
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)

      setNotificationMessage(
        `Hello ${loggedInUser.name}! You have succesfully logged in.`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      setBlogs(blogs.concat(returnedBlog).sort(sortBlogs))
      setNotificationMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exeption) {
      setErrorMessage('Adding blog failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update({
        ...blogObject,
        user: blogObject.user.id,
      })
      const updatedBlog = { ...returnedBlog, user: blogObject.user }
      setBlogs(
        blogs
          .map((blog) => (blog.id !== returnedBlog.id ? blog : updatedBlog))
          .sort(sortBlogs)
      )
    } catch (exeption) {
      setErrorMessage('Updating blog failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blogToDelete) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))

        setNotificationMessage(
          `Removed ${blogToDelete.title} by ${blogToDelete.author}.`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } catch (exeption) {
        setErrorMessage(
          `Removing ${blogToDelete.title} by ${blogToDelete.author} failed.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        />
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
