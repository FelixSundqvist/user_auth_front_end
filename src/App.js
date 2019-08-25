import React, { useState, useEffect } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { blue, purple } from '@material-ui/core/colors'
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import UserPage from './component/UserPage/UserPage'
import routes from './constants/routes'
import { VALIDATE_USER } from './graphql/mutations'
import LandingPage from './component/LandingPage/LandingPage'
import AppBar from './component/UI/AppBar/AppBar'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        textAlign: 'center',
        transition: 'background-color 200ms ease-in',
    },
}))

export default withRouter(({ location, history }) => {
    const [checkValidity, { data }] = useMutation(VALIDATE_USER)
    const [validated, setValidated] = useState(false)

    const classes = useStyles()
    const [style, setStyle] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkValidity({
                variables: { token: localStorage.getItem('token') },
            }).then(({ data }) => setValidated(data))
        }
    }, [])

    useEffect(() => {
        if (location.pathname === '/') {
            setStyle({
                backgroundColor: 'white',
            })
        } else if (location.pathname === routes.LOGIN && loginRoute) {
            setStyle({
                backgroundColor: blue[600],
            })
        } else if (location.pathname === routes.REGISTER && registerRoute) {
            setStyle({
                backgroundColor: purple[500],
            })
        }
    }, [location])

    const loginRoute = !validated ? (
        <Route
            path={routes.LOGIN}
            exact
            render={() => (
                <Login history={history} setValidated={setValidated} />
            )}
        />
    ) : null
    const registerRoute = !validated ? (
        <Route
            path={routes.REGISTER}
            exact
            render={() => (
                <Register history={history} setValidated={setValidated} />
            )}
        />
    ) : null
    const userRoute = validated ? (
        <Route path={routes.USER} exact component={UserPage} />
    ) : null

    return (
        <div className={classes.root} style={style}>
            <AppBar history={history} setValidated={setValidated} />

            {loginRoute}
            {registerRoute}
            {userRoute}

            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/" render={() => <h1>Error</h1>} />
            </Switch>
        </div>
    )
})
