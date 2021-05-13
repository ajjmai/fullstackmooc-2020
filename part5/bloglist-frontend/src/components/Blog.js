import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, loggedInUserId, removeBlog }) => {
  if (!blog) {
    return null
  }

  const handleLikes = (event) => {
    event.preventDefault()
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const own = blog.user.id
    ? loggedInUserId === blog.user.id
    : loggedInUserId === blog.user

  const creator = useMemo(() => blog.user.name, [])

  return (
    <>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={handleLikes}>Like</button>
      </p>
      <p>{creator}</p>
      {own && <button onClick={handleRemove}>remove</button>}
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
