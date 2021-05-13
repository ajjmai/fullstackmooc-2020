import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <>
      <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <p key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </>
  )
}

export default BlogList
