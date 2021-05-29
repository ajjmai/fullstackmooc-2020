import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-usertoken', token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} required />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} required />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
