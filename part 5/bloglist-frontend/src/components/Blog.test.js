import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'


test('a blog renders title and author', () => {
    const blog = {
        title: 'testing using jest',
        author: 'Luu, Duc Tri',
        url: 'not available',
        likes: 12
    }

    const { container } = render(<Blog blog={blog} />)

    const div1 = container.querySelector('.simpleInfo')
    expect(div1).toHaveTextContent(
        '"testing using jest" by Luu, Duc Tri'
    )

    const div2 = container.querySelector('.detailInfo')
    expect(div2).toHaveStyle('display: none')
})