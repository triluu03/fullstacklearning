import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from './queries'

const App = () => {
    const [page, setPage] = useState('authors')

    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)

    console.log(booksResult)

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
    })
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    if (authorsResult.loading || booksResult.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors
                show={page === 'authors'}
                authors={authorsResult.data.allAuthors}
                editAuthor={editAuthor}
            />

            <Books show={page === 'books'} books={booksResult.data.allBooks} />

            <NewBook show={page === 'add'} createBook={createBook} />
        </div>
    )
}

export default App
