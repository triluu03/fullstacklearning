import React from 'react'

import { useParams } from 'react-router-dom'

const Blog = ({ blogs, updateBlog, deleteBlog }) => {
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)

    // Handle Updating new blogs
    const changeLikes = () => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            user: blog.user ? blog.user.id : null, // This condition is for testing
            url: blog.url,
            likes: blog.likes ? blog.likes + 1 : 1,
            comments: blog.comments,
        }
        updateBlog(blog.id, updatedBlog)
    }

    // Handle deleting blogs
    const removeBlog = () => {
        if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
            deleteBlog(blog.id)
        }
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <div>
                <a href={blog.url}>{blog.url}</a>
                <br />
                {blog.likes ? blog.likes : 0} likes
                <button onClick={changeLikes}>like</button> <br />
                added by {blog.user ? blog.user.name : null} <br />
                <button onClick={removeBlog}>remove</button>
                <h3>comments</h3>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </div>
        </div>
    )
}

export default Blog
