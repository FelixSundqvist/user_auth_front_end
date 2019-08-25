import React from 'react'
import { AppBar, Toolbar, Button } from '@material-ui/core'

export default ({ history, setValidated }) => {
    const handleClick = e => {
        e.preventDefault()
        localStorage.removeItem('token')
        setValidated(false)
        history.push('/')
    }
    let appBar = localStorage.getItem('token') ? (
        <AppBar>
            <Toolbar>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClick}
                >
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    ) : null

    return appBar
}
