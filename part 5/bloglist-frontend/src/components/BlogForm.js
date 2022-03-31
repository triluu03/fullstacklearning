import { useState } from 'react'

const BlogForm = ({ createBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        createBlogs({
            title, author, url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            
            <form onSubmit={createBlog}>
                <div>
                    title:
                        <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:
                        <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url:
                        <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default BlogForm
