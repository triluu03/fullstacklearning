import { useState } from 'react'
import PropTypes from 'prop-types'

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
			<h2>create new</h2>

			<form onSubmit={addNewBlog}>
				<div>
					title:
					<input
						className='titleInput'
						type='text'
						value={title}
						onChange={({ target }) => setTitle(target.value)}
						placeholder='write here the title'
					/>
				</div>
				<div>
					author:
					<input
						className='authorInput'
						type='text'
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
						placeholder='write here the author'
					/>
				</div>
				<div>
					url:
					<input
						className='urlInput'
						type='text'
						value={url}
						onChange={({ target }) => setUrl(target.value)}
						placeholder='write here the url'
					/>
				</div>
				<button type='submit'>save</button>
			</form>
		</div>
	)
}

export default BlogForm
