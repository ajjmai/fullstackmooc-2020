import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {
  const me = useQuery(ME)
  const [getBooks, { data: books, loading, error }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (me.loading === false && me.data.me) {
      getBooks({ variables: { genre: me.data.me.favoriteGenre } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.data, me.loading])

  if (me.loading || !me.data || loading || !books) {
    return <div>loading...</div>
  }

  if (me.error || error) {
    props.notify(me.error.graphQLErrors[0].message)
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong>
      </p>
      {books.allBooks.length === 0 ? (
        <p>no books found</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
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
      )}
    </div>
  )
}

export default Recommend
