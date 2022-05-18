import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const [logged, setLogged] = useState(false)

    // Getting blogs from the database
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    // Getting blogs from the redux store
    const reduxBlog = useSelector((state) => state.blogs)

    // Handling logout
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setLogged(false)
    }

    // Handling creating new blogs
    const handleCreateBlogs = async (blogObject) => {
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
        const updatedBlog = await blogService.update(id, blogObject)
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    }

    // Handling deleting blogs
    const handleDeleteBlogs = async (id) => {
        try {
            await blogService.remove(id)
            setBlogs(blogs.filter((blog) => blog.id !== id))
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

    // Sorting blogs
    // reduxBlog.sort((a, b) => b.likes - a.likes)

    // Returning the App Front-end
    return (
        <div>
            {logged === false ? (
                <LoginForm setUser={setUser} setLogged={setLogged} />
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification />
                    <p>
                        {user.name} logged in{' '}
                        <button type='button' onClick={handleLogout}>
                            logout
                        </button>
                    </p>
                    <Togglable
                        buttonLabel='create new blog'
                        ref={createBlogRef}
                    >
                        <BlogForm createBlogs={handleCreateBlogs} />
                    </Togglable>
                    {reduxBlog.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            updateBlog={handleUpdateBlogs}
                            deleteBlog={handleDeleteBlogs}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
