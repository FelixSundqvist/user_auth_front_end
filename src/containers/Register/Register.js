import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import UserFormLayout from '../../component/UserFormLayout/UserFormLayout'
import { REGISTER, LOG_IN } from '../../graphql/mutations'
import Snackbar from '../../component/UI/Snackbar/Snackbar'

const useStyles = makeStyles(theme => ({
    textField: {
        flex: 1,
        margin: theme.spacing(),
    },
    names: {
        flex: 1,
    },
    login: {
        margin: theme.spacing(2),
    },
}))

export default ({ setValidated, history }) => {
    const classes = useStyles()
    const [userRegister, { error, data }] = useMutation(REGISTER)
    const [userLogin, { data: userData }] = useMutation(LOG_IN)
    const [input, setInput] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })
    const fields = {
        USERNAME: 'username',
        FIRST_NAME: 'firstName',
        LAST_NAME: 'lastName',
        EMAIL: 'email',
        PASSWORD: 'password',
        PASSWORD_CONFIRM: 'passwordConfirm',
    }

    useEffect(() => {
        if (data && data.signUp === 'success') {
            userLogin({
                variables: {
                    username: input.username,
                    password: input.password,
                },
            })
        }
    }, [data])

    useEffect(() => {
        if (userData) {
            const { login } = userData
            if (login) {
                localStorage.setItem('token', login.token)
                setValidated(true)
                history.push('/user')
            }
        }
    }, [userData])

    const handleChange = (event, key) => {
        setInput({
            ...input,
            [key]: event.target.value,
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        userRegister({ variables: input })
    }

    let errorMessage = error ? (
        <Snackbar variant="error" message={error.message} />
    ) : null

    return (
        <>
            {errorMessage}
            <UserFormLayout title="Register" onSubmit={handleSubmit}>
                <TextField
                    required
                    id={fields.USERNAME}
                    label="Username"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={input.username}
                    onChange={event => handleChange(event, fields.USERNAME)}
                    autoComplete="username"
                />
                <div className={classes.names}>
                    <TextField
                        id={fields.FIRST_NAME}
                        label="First Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={input.firstName}
                        onChange={event =>
                            handleChange(event, fields.FIRST_NAME)
                        }
                    />
                    <TextField
                        id={fields.LAST_NAME}
                        label="Last Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={input.lastName}
                        onChange={event =>
                            handleChange(event, fields.LAST_NAME)
                        }
                    />
                </div>
                <TextField
                    required
                    id={fields.EMAIL}
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    type="email"
                    value={input.email}
                    onChange={event => handleChange(event, fields.EMAIL)}
                />

                <TextField
                    required
                    autoComplete="new-password"
                    id={fields.PASSWORD}
                    label="Password"
                    className={classes.textField}
                    margin="normal"
                    type="password"
                    variant="outlined"
                    value={input.password}
                    onChange={event => handleChange(event, fields.PASSWORD)}
                />
                <TextField
                    required
                    id={fields.PASSWORD_CONFIRM}
                    autoComplete="new-password"
                    label="Confirm Password"
                    className={classes.textField}
                    margin="normal"
                    type="password"
                    variant="outlined"
                    value={input.passwordConfirm}
                    onChange={event =>
                        handleChange(event, fields.PASSWORD_CONFIRM)
                    }
                />
                <div className={classes.login}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Register
                    </Button>
                </div>
                <div className={classes.login}>
                    Already a user? <NavLink to="/login"> Login</NavLink>
                </div>
            </UserFormLayout>
        </>
    )
}
