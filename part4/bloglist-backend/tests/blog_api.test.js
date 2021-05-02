const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./testUtils')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithManyBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain('React patterns')
  })

  test('blogs contain field "id"', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id).toBeDefined()
  })

  describe('adding a new blog', () => {
    test('succeeds with a valid data', async () => {
      await api
        .post('/api/blogs')
        .send(helper.listWithOneBlog[0])
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map((blog) => blog.title)

      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)
      expect(titles).toContain(helper.listWithOneBlog[0].title)
    })

    test('likes is 0 if no initial value is given', async () => {
      const newBlog = {
        title: 'The semantic future of the web',
        author: 'James Turner',
        url:
          'https://stackoverflow.blog/2020/12/10/the-semantic-future-of-the-web/',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })

    test('fails with status code 400 if title missing', async () => {
      const newBlog = {
        author: 'James Turner',
        url:
          'https://stackoverflow.blog/2020/12/10/the-semantic-future-of-the-web/',
        likes: 1,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })

    test('fails with status code 400 if url missing', async () => {
      const newBlog = {
        title: 'The semantic future of the web',
        author: 'James Turner',
        likes: 1,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('should succeed with a status code 204 with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length - 1)

      const titles = blogsAtEnd.map((blog) => blog.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('should fail with status code 400 with invalid id', async () => {
      await api.delete(`/api/blogs/${helper.nonExistingId}`).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
