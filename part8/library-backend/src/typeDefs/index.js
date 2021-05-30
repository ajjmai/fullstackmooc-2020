const { gql } = require('apollo-server')
const { author } = require('./types/author')
const { book } = require('./types/book')
const { userAndToken } = require('./types/user')
const { query } = require('./query')
const { mutation } = require('./mutation')

const typeDefs = [author, book, userAndToken, query, mutation]

module.exports = { typeDefs }
