import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import backgroundImage from '../../assets/background.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing(2),
    },
    wrapper: {
        backgroundColor: 'black',
        width: '100%',
    },
    title: {
        margin: theme.spacing(2),
    },
    buttonLink: {
        textDecoration: 'none',
        color: 'white',
    },
}))
export default () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Typography variant="h1" className={classes.title}>
                    Join The Movement
                </Typography>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        <NavLink to="/register" className={classes.buttonLink}>
                            Register
                        </NavLink>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >
                        <NavLink to="/login" className={classes.buttonLink}>
                            login
                        </NavLink>
                    </Button>
                </div>
            </div>
        </div>
    )
}
