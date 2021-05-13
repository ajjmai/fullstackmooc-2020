import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

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

  return (
    <>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          own={user.id === blog.user.id || user.id === blog.user}
        />
      ))}
    </>
  )
}

export default BlogList
