import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ addComment, blogId }) => {
  const [comment, setComment] = useState('')

  const handleChange = ({ target }) => {
    setComment(target.value)
  }

  const commentBlog = (event) => {
    event.preventDefault()
    addComment(blogId, comment)
    setComment('')
  }

  return (
    <form onSubmit={commentBlog}>
      <div>
        <input
          type='text'
          value={comment}
          name='Comment'
          id='comment'
          onChange={handleChange}
        />
        <button type='submit'>add comment</button>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  blogId: PropTypes.string.isRequired,
}

export default CommentForm
