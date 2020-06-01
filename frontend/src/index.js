import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Auth from './components/Auth'
import { IS_LOGGED_IN } from "./library/graphQL"

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/',
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        const token = localStorage.getItem('authToken') || ""
        operation.setContext({
            headers: {
                Authorization: `JWT ${token}`
            }
        })
    },
    clientState: {
        defaults: {
            isLoggedIn: !!localStorage.getItem('authToken')
        }
    }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Query query={IS_LOGGED_IN}>
            {({ data }) => data.isLoggedIn ? <App /> : <Auth/>}
        </Query>
    </ApolloProvider>
    , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
