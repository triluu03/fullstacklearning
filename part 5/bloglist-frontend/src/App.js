import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  	const [blogs, setBlogs] = useState([])
  	const [user, setUser] = useState(null)

  	const [username, setUsername] = useState('')
  	const [password, setPassword] = useState('')
  	const [logged, setLogged] = useState(false)

  	const [notification, setNotification] = useState(null)



  	// Getting blogs from the database
  	useEffect(() => {
    	blogService.getAll().then(blogs =>
      		setBlogs(blogs)
    	)
  	}, [])


  	// Loading the logged user from browser's local storage
  	useEffect(() => {
    	const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    	if (loggedUserJSON) {
      		const user = JSON.parse(loggedUserJSON)
      		setUser(user)
      		setLogged(true)
      		blogService.setToken(user.token)
    	}
  	}, [])


  	// Setting Notification messages
  	const notify = (message, type='info') => {
    	setNotification({ message, type })
    	setTimeout(() => {
      		setNotification(null)
    	}, 5000)
  	}


  	// Handling login
  	const handleLogin = async (event) => {
    	event.preventDefault()
    	try {
      		const user = await loginService.login({
        		username, password
      		})

      		window.localStorage.setItem(
        		'loggedBlogUser', JSON.stringify(user)
      		)
      		blogService.setToken(user.token)
      		setUser(user)
      		setLogged(true)
      		setUsername('')
      		setPassword('')
    	} catch(exception) {
      		setUsername('')
      		setPassword('')
      		notify('wrong username or password', 'alert')
    	}
  	}


  	// Handling logout
  	const handleLogout = () => {
    	window.localStorage.removeItem('loggedBlogUser')
    	setLogged(false)
  	}


  	// Handling creating new blogs
  	const handleCreateBlogs = async (blogObject) => {
    	try {
      		const createdBlog = await blogService.create(blogObject)
      		createBlogRef.current.toggleVisibility()
      		notify(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`)
      		setBlogs(blogs.concat(createdBlog))
    	} catch(exception) {
      		notify('invalid blog entry', 'alert')
    	}
  	}


  	// Handling updating blogs
  	const handleUpdateBlogs = async (id, blogObject) => {
    	const updatedBlog = await blogService.update(id, blogObject)
    	setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  	}


  	// Handling deleting blogs
  	const handleDeleteBlogs = async id => {
    	try {
      		await blogService.remove(id)
      		setBlogs(blogs.filter(blog => blog.id !== id))
    	} catch(exception) {
      		notify('only the creator of the blog can delete', 'alert')
    	}
  	}


  	// Login front-end
  	const loginForm = () => (
    	<div>
      		<h2>Log in to the application</h2>
      		<Notification notification={notification} />
      		<form onSubmit={handleLogin}>
        		<div>
          			username
            		<input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        		</div>
        		<div>
          			password
            		<input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        		</div>
        		<button type='submit'>login</button>
      		</form>
    	</div>
  	)


  	// Creating blog reference
  	const createBlogRef = useRef()


  	// Sorting blogs
  	blogs.sort((a, b) => b.likes - a.likes)


  	// Returning the App Front-end
  	return (
    	<div>
      		{logged === false ?
        		loginForm() :
        		<div>
          			<h2>blogs</h2>
          			<Notification notification={notification} />
          			<p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
          			<Togglable buttonLabel='create new blog' ref={createBlogRef}>
            			<BlogForm createBlogs={handleCreateBlogs} />
          			</Togglable>
          			{blogs.map(blog =>
            			<Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlogs} deleteBlog={handleDeleteBlogs} />
          			)}
        		</div>
      		}
    	</div>
  	)
}

export default App