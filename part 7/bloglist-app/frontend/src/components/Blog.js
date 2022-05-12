import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
			user: blog.user ? blog.user.id : null, //This condition is for testing
			url: blog.url,
			likes: blog.likes ? blog.likes + 1 : 1,
		}
		updateBlog(blog.id, updatedBlog)
	}

	// Handle deleting blogs
	const removeBlog = () => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			deleteBlog(blog.id)
		}
	}

	// Blog Style
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div>
			<div style={hideWhenVisible} className='simpleInfo'>
				<div style={blogStyle}>
					"{blog.title}" by {blog.author}
					<button onClick={toggleVisibility}>view</button>
				</div>
			</div>
			<div style={showWhenVisible} className='detailInfo'>
				<div style={blogStyle}>
					"{blog.title}" by {blog.author}
					<button onClick={toggleVisibility}>hide</button> <br />
					{blog.url} <br />
					likes: {blog.likes ? blog.likes : 0}
					<button onClick={changeLikes}>like</button> <br />
					{blog.user ? blog.user.name : null} <br />
					<button onClick={removeBlog}>remove</button>
				</div>
			</div>
		</div>
	)
}

export default Blog
