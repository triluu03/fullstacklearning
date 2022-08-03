import { useState } from 'react'

const Books = (props) => {
    const [genre, setGenre] = useState(null)
    const [genreList, setGenreList] = useState([])

    if (!props.show) {
        return null
    }

    const books = props.books

    books.forEach((book) => {
        book.genres.forEach((g) => {
            if (!genreList.includes(g)) {
                setGenreList(genreList.concat(g))
            }
        })
    })

    const booksToShow = genre
        ? books.filter((book) => book.genres.includes(genre))
        : books

    return (
        <div>
            <h2>books</h2>
            {genre ? (
                <p>
                    in genre <b>{genre}</b>
                </p>
            ) : null}
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {booksToShow.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                {genreList.map((g) => (
                    <button key={g} onClick={() => setGenre(g)}>
                        {g}
                    </button>
                ))}
                <button onClick={() => setGenre(null)}>all genres</button>
            </div>
        </div>
    )
}

export default Books
