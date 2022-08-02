const Recommendations = ({ show, books }) => {
    if (!show) {
        return null
    }

    const favouriteGenre = localStorage.getItem('library-user-genre')

    const booksToShow = books.filter((b) => b.genres.includes(favouriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favourite genre <b>{favouriteGenre}</b>
            </p>
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
    )
}

export default Recommendations
