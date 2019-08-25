import React from 'react'
import { Typography, Paper, makeStyles, Grid } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    grid: {
        minHeight: '100vh',
        padding: theme.spacing(2),
        animation: '$enter 1000ms ease',
    },
    form: {
        padding: theme.spacing(4),
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        padding: theme.spacing(),
    },
    '@keyframes enter': {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
    },
}))
export default ({ title, onSubmit, children }) => {
    const classes = useStyles()

    return (
        <Grid
            className={classes.grid}
            container
            alignItems="center"
            justify="center"
        >
            <Paper>
                <Typography variant="h5" className={classes.title}>
                    {title}
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    {children}
                </form>
            </Paper>
        </Grid>
    )
}
