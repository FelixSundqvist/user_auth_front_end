import React, { useState } from 'react'
import {
    IconButton,
    makeStyles,
    SnackbarContent,
    Snackbar,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { green, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: red[500],
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
}))

export default ({ message, variant }) => {
    const classes = useStyles()

    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Snackbar
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
            >
                <SnackbarContent
                    className={classes[variant]}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                ></SnackbarContent>
            </Snackbar>
        </div>
    )
}
