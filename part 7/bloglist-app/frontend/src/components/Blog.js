import React from 'react'

import { useParams } from 'react-router-dom'

import { Button } from 'react-bootstrap'

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
                <Button
                    variant='outline-primary'
                    size='sm'
                    onClick={changeLikes}
                >
                    like
                </Button>{' '}
                <br />
                added by {blog.user ? blog.user.name : null} <br />
                <Button variant='outline-danger' size='sm' onClick={removeBlog}>
                    remove
                </Button>
                <h3>comments</h3>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </div>
        </div>
    )
}

export default Blog
