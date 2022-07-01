import { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = (event) => {
        event.preventDefault()
        createBlogs({
            title,
            author,
            url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    BlogForm.propTypes = {
        createBlogs: PropTypes.func.isRequired,
    }

    return (
        <div>
            <h3>create new</h3>

            <Form onSubmit={addNewBlog}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        className='titleInput'
                        type='text'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder='write here the title'
                    />

                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        className='authorInput'
                        type='text'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder='write here the author'
                    />

                    <Form.Label>Link</Form.Label>
                    <Form.Control
                        className='urlInput'
                        type='text'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder='write here the url'
                    />

                    <Button variant='outline-primary' type='submit'>
                        save
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
