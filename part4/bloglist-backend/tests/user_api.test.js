const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const helper = require('./testUtils')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekretpassword', 11)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(1)
  })

  describe('adding a new user', () => {
    test('should succeed with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'adalove',
        name: 'Ada Lovelace',
        password: 'salainensalasana',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map((user) => user.username)
      expect(usernames).toContain(newUser.username)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
