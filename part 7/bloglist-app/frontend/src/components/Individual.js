import React from 'react'

import { useParams } from 'react-router-dom'

const Individual = ({ users }) => {
    const id = useParams().id
    const user = users.find((u) => u.id === id)
    if (!user) {
        return null
    }

    const blogs = user.blogs
    return (
        <div>
            <h2>added blogs</h2>
            {blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </div>
    )
}

export default Individual
