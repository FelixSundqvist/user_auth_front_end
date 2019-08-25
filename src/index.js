import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import { resolvers, typeDefs } from './graphql/resolvers'
import './index.css'
import App from './App'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme()

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const link = ApolloLink.from([
    onError(({ graphqlErrors, networkError }) => {
        if (graphqlErrors)
            graphqlErrors.forEach(({ message, locations, path }) =>
                console.log(`
                    [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} `)
            )
        if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
        uri: process.env.REACT_APP_API,
    }),
])

const cache = new InMemoryCache()

const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
    typeDefs,
    resolvers,
    connectToDevTools: true,
})

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
    },
})

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.unregister()
