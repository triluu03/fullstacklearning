import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('<BlogForm /> adds new blogs with correct content', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlogs={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write here the title')
    const authorInput = screen.getByPlaceholderText('write here the author')
    const urlInput = screen.getByPlaceholderText('write here the url')
    const sendButton = screen.getByText('save')

    userEvent.type(titleInput, 'testing blog form ...')
    userEvent.type(authorInput, 'tester')
    userEvent.type(urlInput, 'not available')
    userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing blog form ...')
    expect(createBlog.mock.calls[0][0].author).toBe('tester')
    expect(createBlog.mock.calls[0][0].url).toBe('not available')
})