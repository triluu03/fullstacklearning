import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            const favouriteGenre = result.data.login.favouriteGenre
            localStorage.setItem('library-user-genre', favouriteGenre)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
        setPage('authors')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username{' '}
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password{' '}
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm
