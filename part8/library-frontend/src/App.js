import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((item) => item.id).includes(object.id)

    const booksInStore = client.readQuery({ query: ALL_BOOKS })
    if (booksInStore && !includedIn(booksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: booksInStore.allBooks.concat(addedBook) },
      })
    }

    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    if (authorsInStore && !includedIn(authorsInStore.allAuthors, addedBook.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: authorsInStore.allAuthors.concat(addedBook.author) },
      })
    }

    const genresInStore = client.readQuery({ query: ALL_GENRES })
    if (genresInStore && !addedBook.genres.forEach((item) => genresInStore.allGenres.includes(item))) {
      const missingGenres = addedBook.genres.filter((item) => !genresInStore.allGenres.includes(item))
      client.writeQuery({
        query: ALL_GENRES,
        data: { allGenres: genresInStore.allGenres.concat(missingGenres) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`A new book '${addedBook.title}' by ${addedBook.author.name} was just added.`)
      updateCacheWith(addedBook)
    },
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setPage('login')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      {page === 'authors' && <Authors setError={notify} token={token} />}

      {page === 'books' && <Books setError={notify} />}

      {page === 'add' && <NewBook setError={notify} />}

      {page === 'recommend' && <Recommend setError={notify} />}

      {page === 'login' && <Login setToken={setToken} setError={notify} setPage={setPage} />}
    </div>
  )
}

export default App
