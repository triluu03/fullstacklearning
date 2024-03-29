import React, { useEffect, useState } from 'react'
import {
    useSubscription,
    useQuery,
    useMutation,
    useApolloClient,
} from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import {
    ALL_AUTHORS,
    ALL_BOOKS,
    CREATE_BOOK,
    EDIT_AUTHOR,
    BOOK_ADDED,
} from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)

    useEffect(() => {
        const userToken = localStorage.getItem('library-user-token')
        if (userToken) {
            setToken(userToken)
        }
    }, [])

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id)

        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) },
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const book = subscriptionData.data.bookAdded
            alert('new book ' + book.title + ' by ' + book.author.name)
            updateCacheWith(book)
        },
    })

    const client = useApolloClient()

    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }],
    })
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    if (authorsResult.loading || booksResult.loading) {
        return <div>loading...</div>
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm setToken={setToken} setPage={setPage} />
            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                <button onClick={logout}>logout</button>
            </div>

            <Authors
                show={page === 'authors'}
                authors={authorsResult.data.allAuthors}
                editAuthor={editAuthor}
            />

            <Books show={page === 'books'} books={booksResult.data.allBooks} />

            <NewBook show={page === 'add'} createBook={createBook} />

            <Recommendations
                show={page === 'recommend'}
                books={booksResult.data.allBooks}
            />
        </div>
    )
}

export default App
