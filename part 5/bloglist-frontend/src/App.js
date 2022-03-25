import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [logged, setLogged] = useState(false)


  // Getting blogs
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
      console.log('Wrong credentials')
    }
  }


  // Logout form
  const logoutForm = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setLogged(false)
  }


  // Login front-end
  const loginForm = () => {
    if (logged === false) {
      return (
        <div>
          <h2>Log in to the application</h2>
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
    }

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button type='button' onClick={logoutForm}>logout</button></p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )    
  }



// Returning the App Front-end
  return (
    <div>
      {loginForm()}
    </div>
  )
}

export default App