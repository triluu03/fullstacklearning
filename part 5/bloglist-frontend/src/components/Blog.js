import React from 'react'
import { useState } from 'react'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10, 
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          "{blog.title}" by {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>  
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          "{blog.title}" by {blog.author}
          <button onClick={toggleVisibility}>hide</button> <br />

          {blog.url} <br />

          likes: {blog.likes ? blog.likes : 0}
          <button>like</button> <br />

          {blog.user.name}
        </div>  
      </div>
    </div>
    
    
  )
}

export default Blog