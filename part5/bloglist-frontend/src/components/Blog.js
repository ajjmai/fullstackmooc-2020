import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, own, removeBlog }) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleExpand = () => {
    setExpand(!expand)
  }

  const handleLikes = (event) => {
    event.preventDefault()
    likeBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }

  const fullInfo = () => (
    <>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={handleLikes}>Like</button>
      </p>
      <p>{blog.user.name}</p>
      {own && <button onClick={handleRemove}>remove</button>}
    </>
  )

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}{' '}
      <button onClick={handleExpand}>{expand ? 'hide' : 'view'}</button>
      {expand && fullInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
