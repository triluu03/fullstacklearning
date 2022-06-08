import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Users from './components/Users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Individual from './components/Individual'

import { setNotification } from './reducers/notificationReducer'
import {
    initializeBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
} from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersListReducer'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()

    const [logged, setLogged] = useState(false)

    // Getting blogs from the database
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    // Getting users info from the database
    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    // Getting blogs, signed in user, and users information from the redux store
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const usersList = useSelector((state) => state.usersList)

    // Handling logout
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setLogged(false)
    }

    // Handling creating new blogs
    const handleCreateBlogs = (blogObject) => {
        try {
            dispatch(createBlog(blogObject))
            createBlogRef.current.toggleVisibility()
        } catch (exception) {
            dispatch(
                setNotification({
                    message: 'invalid blog entry',
                    type: 'alert',
                })
            )
        }
    }

    // Handling updating blogs
    const handleUpdateBlogs = async (id, blogObject) => {
        dispatch(updateBlog(id, blogObject))
    }

    // Handling deleting blogs
    const handleDeleteBlogs = (id) => {
        try {
            dispatch(deleteBlog(id))
        } catch (exception) {
            dispatch(
                setNotification({
                    message: 'only the creator of the blog can delete',
                    type: 'alert',
                })
            )
        }
    }

    // Creating blog reference
    const createBlogRef = useRef()

    const padding = {
        padding: 5,
    }

    // Returning the App Front-end
    return (
        <div>
            {logged === false ? (
                <LoginForm setLogged={setLogged} />
            ) : (
                <BrowserRouter>
                    <div>
                        <Link style={padding} to='/'>
                            home
                        </Link>
                        <Link style={padding} to='/users'>
                            users
                        </Link>
                    </div>

                    <h2>blogs</h2>

                    <Notification />
                    <p>
                        {user.name} logged in{' '}
                        <button type='button' onClick={handleLogout}>
                            logout
                        </button>
                    </p>
                    <Routes>
                        <Route
                            path='/users'
                            element={<Users users={usersList} />}
                        />
                        <Route
                            path='/'
                            element={
                                <div>
                                    <Togglable
                                        buttonLabel='create new blog'
                                        ref={createBlogRef}
                                    >
                                        <BlogForm
                                            createBlogs={handleCreateBlogs}
                                        />
                                    </Togglable>
                                    {blogs.map((blog) => (
                                        <Blog
                                            key={blog.id}
                                            blog={blog}
                                            updateBlog={handleUpdateBlogs}
                                            deleteBlog={handleDeleteBlogs}
                                        />
                                    ))}
                                </div>
                            }
                        />
                        <Route
                            path='/users/:id'
                            element={<Individual users={usersList} />}
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
