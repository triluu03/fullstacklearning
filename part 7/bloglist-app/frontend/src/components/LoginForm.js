import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './Notification'

import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ setLogged }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Loading the logged user from browser's local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            setLogged(true)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
            setLogged(true)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setUsername('')
            setPassword('')
            dispatch(
                setNotification({
                    message: 'wrong username or password',
                    type: 'alert',
                })
            )
        }
    }

    return (
        <div>
            <h2>Login to the application</h2>
            <Notification />
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />

                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id='password'
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />

                    <Button variant='primary' type='submit'>
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm
