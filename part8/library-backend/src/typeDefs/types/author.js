const { gql } = require('apollo-server')

const author = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
`
module.exports = { author }
