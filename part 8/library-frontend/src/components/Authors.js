import { useState } from 'react'

const Authors = (props) => {
    const [author, setAuthor] = useState('')
    const [born, setBorn] = useState('')

    if (!props.show) {
        return null
    }

    const authors = props.authors

    const submit = async (event) => {
        event.preventDefault()

        await props.editAuthor({
            variables: { name: author, setBornTo: Number(born) },
        })
        console.log('updating author...')

        setAuthor('')
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Set birthyear</h2>
                <form onSubmit={submit}>
                    <div>
                        name
                        <input
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        born
                        <input
                            value={born}
                            onChange={({ target }) => setBorn(target.value)}
                        />
                    </div>
                    <button type='submit'>update author</button>
                </form>
            </div>
        </div>
    )
}

export default Authors
