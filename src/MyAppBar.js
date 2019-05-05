import React, { useState } from 'react'
import { withStyles, AppBar, Toolbar, Typography, Button, Modal, Paper, TextField } from '@material-ui/core';
import { lightGreen200 } from 'material-ui/styles/colors';

function MyAppBar(props) {

    const [modalopen, setModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e) => setUsername(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const logout = () => {
        localStorage.removeItem('token');
        props.handler(false);
    }

    const getToken = () => {
        setModalOpen(false);
        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((result) => result.json())
            .then(result => {
                console.log(result.token);
                localStorage.setItem('token', result.token);
                props.handler(true);
            })
            .catch(result => props.handler(true));
    }

    const { classes } = props;
    return (
        <AppBar className={classes.appBar} position="static" color="default">
            <Toolbar>
                <Typography className={classes.appBarTitle} component="h2" variant="h5" align="center" color="inherit" noWrap>
                    Strength Standards
                    </Typography>
                <Button variant="outlined" size="small" onClick={props.loggedIn ? logout : openModal}>
                    {props.loggedIn ? "Log Out" : "Log In"}
                </Button>
            </Toolbar>
            <Modal open={modalopen}>
                <Paper className={classes.modalPaper}>
                    <TextField onChange={updateUsername} label="username" type="text" />
                    <TextField onChange={updatePassword} label="password" type="password" />
                    <br /><br />
                    <Button onClick={getToken} className={classes.button} variant="contained">Login</Button>
                    <Button onClick={closeModal} className={classes.button} variant="contained">Cancel</Button>
                </Paper>
            </Modal>
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
    },
    modalPaper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    button: {
        marginRight: theme.spacing.unit * 4
    }
});

export default withStyles(styles)(MyAppBar)
