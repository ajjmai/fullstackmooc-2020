const { gql } = require('apollo-server')

const userAndToken = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`

module.exports = { userAndToken }
