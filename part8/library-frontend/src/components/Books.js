import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const { data: books, loading, error, refetch } = useQuery(ALL_BOOKS)
  const { data: genres, loading: genres_loading, error: genres_error } = useQuery(ALL_GENRES)
  const [genre, setGenre] = useState('all genres')

  if (loading || !books || genres_loading || !genres) {
    return <div>loading...</div>
  }

  if (error || genres_error) {
    props.notify(error.graphQLErrors[0].message)
  }

  const handleClick = (genre) => {
    setGenre(genre)

    if (genre === 'all genres') {
      refetch({ genre: null })
    } else {
      refetch({ genre: genre })
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <strong>author</strong>
            </th>
            <th>
              <strong>published</strong>
            </th>
          </tr>
          {books.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.allGenres.map((genre) => (
          <button key={genre} onClick={() => handleClick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleClick('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
