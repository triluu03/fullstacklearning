import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }



  // Handle Updating new blogs
  const changeLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      url: blog.url,
      likes: blog.likes ? blog.likes + 1 : 1
    }
    updateBlog(blog.id, updatedBlog)
  }


  // Blog Style
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
          <button onClick={changeLikes}>like</button> <br />

          {blog.user.name}
        </div>  
      </div>
    </div>
    
    
  )
}

export default Blog