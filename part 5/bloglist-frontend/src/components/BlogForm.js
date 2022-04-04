import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = (event) => {
        event.preventDefault()
        createBlogs({
            title, author, url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }


    BlogForm.propTypes = {
        createBlogs: PropTypes.func.isRequired
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={addNewBlog}>
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