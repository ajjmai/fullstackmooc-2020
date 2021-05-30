const { gql } = require('apollo-server')

const book = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
`

module.exports = { book }
