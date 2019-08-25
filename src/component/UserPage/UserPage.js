import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { GET_USER } from '../../graphql/queries'
import { orange } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: orange[500],
    },
    main: {
        padding: theme.spacing(2),
    },
}))
export default () => {
    const classes = useStyles()
    const { error, data, loading } = useQuery(GET_USER)
    const { user } = data
    return (
        <div className={classes.root}>
            <Paper className={classes.main}>
                <Typography variant="h3">
                    Hello {user && user.username ? user.username : null}
                </Typography>
            </Paper>
        </div>
    )
}
