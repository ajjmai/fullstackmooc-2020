import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  const fullInfo = () => (
    <>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button>Like</button>
      </p>
      <p>{blog.user.name}</p>
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

export default Blog
