import { useField } from "../hooks"


const CreateNew = (props) => {
	const content = useField('text')
	const author = useField('text')
	const info = useField('text')


    // Handling submit new anecdotes
	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
		})
	}


    // Handling reset button
    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name='content' value={content.value} onChange={content.onChange} />
				</div>
				<div>
					author
					<input name='author' value={author.value} onChange={author.onChange} />
				</div>
				<div>
					url for more info
					<input name='info' value={info.value} onChange={info.onChange} />
				</div>
				<button type='submit'>create</button>
                <button type='button' onClick={handleReset}>reset</button>
			</form>
		</div>
	)
}


export default CreateNew