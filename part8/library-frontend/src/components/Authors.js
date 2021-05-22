import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
                <option value='' disabled selected>
                  Select author
                </option>
              {authors.data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} required />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </>
  )
}

export default Authors
