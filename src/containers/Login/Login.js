import React, { useState, useEffect } from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { LOG_IN } from '../../graphql/mutations'
import UserFormLayout from '../../component/UserFormLayout/UserFormLayout'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(),
    },
}))

export default ({ history, setValidated }) => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userLogin, { error, data }] = useMutation(LOG_IN)

    const handleSubmit = e => {
        e.preventDefault()
        userLogin({ variables: { username, password } })
    }

    useEffect(() => {
        if (data) {
            const { login } = data
            if (login) {
                localStorage.setItem('token', login.token)
                setValidated(true)
                history.push('/user')
            }
        }
    }, [data])

    return (
        <UserFormLayout title="Login" onSubmit={handleSubmit}>
            {error ? <p>Please enter correct information</p> : null}
            <TextField
                error={error ? true : false}
                autoComplete="current-username"
                id="name"
                label="Name"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <TextField
                error={error ? true : false}
                autoComplete="current-password"
                id="password"
                label="Password"
                className={classes.textField}
                margin="normal"
                type="password"
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Login
                </Button>
            </div>
            <p>
                Not a member? <NavLink to="/register">Register</NavLink>
            </p>
        </UserFormLayout>
    )
}
