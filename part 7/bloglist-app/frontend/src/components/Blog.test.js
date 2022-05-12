import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('a blog renders title and author', () => {
	const blog = {
		title: 'testing using jest',
		author: 'Luu, Duc Tri',
		url: 'not available',
		likes: 12,
	}
	const { container } = render(<Blog blog={blog} />)

	const div1 = container.querySelector('.simpleInfo')
	expect(div1).toHaveTextContent('"testing using jest" by Luu, Duc Tri')

	const div2 = container.querySelector('.detailInfo')
	expect(div2).toHaveStyle('display: none')
})

test('clicking button shows the details about the blog', () => {
	const blog = {
		title: 'testing using jest',
		author: 'Luu, Duc Tri',
		url: 'not available',
		likes: 12,
	}
	const { container } = render(<Blog blog={blog} />)

	const button = screen.getByText('view')
	userEvent.click(button)

	const div = container.querySelector('.detailInfo')
	expect(div).not.toHaveStyle('display: none')
})

test('clicking likes button works', () => {
	const blog = {
		title: 'testing using jest',
		author: 'Luu, Duc Tri',
		url: 'not available',
		likes: 12,
	}
	const update = jest.fn()
	render(<Blog blog={blog} updateBlog={update} />)
	const button = screen.getByText('like')
	userEvent.click(button)
	userEvent.click(button)

	expect(update.mock.calls).toHaveLength(2)
})
