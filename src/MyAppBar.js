import React from 'react'
import { withStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { lightGreen200 } from 'material-ui/styles/colors';

function MyAppBar(props) {
    const logout = () => {
        localStorage.removeItem('token');
        props.handler(false);
    }

    const login = () => {
        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'x',
                password: 'x'
            })
        })
            .then((result) => result.json()
                .then(result => {
                    localStorage.setItem('token', result.token);
                    props.handler(true);
                }));
    }

    const { classes } = props;
    return (
        <AppBar className={classes.appBar} position="static" color="default">
            <Toolbar>
                <Typography className={classes.appBarTitle} component="h2" variant="h5" align="center" color="inherit" noWrap>
                    Strength Standards
                    </Typography>
                <Button variant="outlined" size="small" onClick={props.loggedIn ? logout : login}>
                    {props.loggedIn ? "Log Out" : "Log In"}
                </Button>
            </Toolbar>
        </AppBar>
    )
}

const styles = theme => ({
    appBar: {
        backgroundColor: lightGreen200,
        marginBottom: theme.spacing.unit * 2
    },
    appBarTitle: {
        flex: 1
    }
});

export default withStyles(styles)(MyAppBar)
