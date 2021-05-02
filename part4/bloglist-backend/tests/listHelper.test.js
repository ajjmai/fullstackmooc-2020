const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs } = require('./testUtils')

test('dummy return one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('is 0 when list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('equals the likes of one blog when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('is calculated right when list has many blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})
