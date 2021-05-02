const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decocedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decocedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decocedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    editedBlog,
    { new: true }
  )
  response.status(200).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
