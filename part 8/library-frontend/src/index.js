import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
    ApolloProvider,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        },
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
})

const query = gql`
    query {
        allAuthors {
            name
            born
        }
    }
`

client.query({ query }).then((response) => {
    console.log(response.data)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
