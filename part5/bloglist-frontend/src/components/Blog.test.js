import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  test('should render title and author by default but not url or likes', () => {
    const blog = {
      title: 'A blog about testing',
      author: 'Just me',
      url: 'www.just.me',
      likes: 10,
    }

    const component = render(
      <Blog
        blog={blog}
        likeBlog={jest.fn()}
        loggedInUsername={'adalove'}
        removeBlog={jest.fn()}
      />
    )

    expect(component.container).toHaveTextContent(
      'A blog about testing by Just me'
    )
    expect(component.container).not.toHaveTextContent('www.just.me')
    expect(component.container).not.toHaveTextContent('likes')
  })
})
