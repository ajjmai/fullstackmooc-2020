import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value)
  }
  const handleUrlChange = ({ target }) => {
    setUrl(target.value)
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
