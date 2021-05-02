const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./testUtils')

const api = supertest(app)

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

test('a valid blog can be added', async () => {
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

test('a blog without title is not added', async () => {
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

test('a blog without url is not added', async () => {
  const newBlog = {
    title: 'The semantic future of the web',
    author: 'James Turner',
    likes: 1,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
