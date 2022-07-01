import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
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

import { Button, Container, Navbar, Nav } from 'react-bootstrap'

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
    const handleUpdateBlogs = (id, blogObject) => {
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

    const headerStyle = {
        backgroundColor: 'lightGray',
        paddingTop: 5,
        paddingBottom: 5,
    }

    // Returning the App Front-end
    return (
        <div className='container'>
            {logged === false ? (
                <LoginForm setLogged={setLogged} />
            ) : (
                <BrowserRouter>
                    <Navbar bg='light' expand='lg'>
                        <Container>
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Navbar.Brand>
                                    {user.name} logged in
                                    <Button
                                        variant='outline-primary'
                                        size='sm'
                                        type='button'
                                        onClick={handleLogout}
                                    >
                                        logout
                                    </Button>
                                </Navbar.Brand>

                                <Nav className='me-auto'>
                                    <Nav.Link style={padding} href='/'>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link style={padding} href='/users'>
                                        Users
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <Notification />
                    <Routes>
                        <Route
                            path='/users'
                            element={<Users users={usersList} />}
                        />
                        <Route
                            path='/'
                            element={
                                <div>
                                    <h2>Blogs</h2>
                                    <Togglable
                                        buttonLabel='create new blog'
                                        ref={createBlogRef}
                                    >
                                        <BlogForm
                                            createBlogs={handleCreateBlogs}
                                        />
                                    </Togglable>
                                    {blogs.map((blog) => (
                                        <BlogList key={blog.id} blog={blog} />
                                    ))}
                                </div>
                            }
                        />
                        <Route
                            path='/users/:id'
                            element={<Individual users={usersList} />}
                        />
                        <Route
                            path='/blogs/:id'
                            element={
                                <Blog
                                    blogs={blogs}
                                    updateBlog={handleUpdateBlogs}
                                    deleteBlog={handleDeleteBlogs}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    )
}

export default App
