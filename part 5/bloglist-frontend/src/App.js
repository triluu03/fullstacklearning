import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    }, 3000)
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
  const handleCreateBlogs = async (event) => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      notify(`a new blog "${createdBlog.title}" by ${createdBlog.author} added`)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(exception) {
      notify('invalid blog entry', 'alert')
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
            <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
            <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )    
  

  
  // Logged in blog form
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlogs}>
        <div>
          title:
            <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
            <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
            <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )



// Returning the App Front-end
  return (
    <div>
      {logged === false ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App