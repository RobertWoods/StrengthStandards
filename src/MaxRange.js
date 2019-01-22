import React from 'react';
import './index.css';
import { LinearProgress, withStyles, Grid } from '@material-ui/core';
import { green200 } from 'material-ui/styles/colors';
import { green50 } from 'material-ui/styles/colors';

function MaxRange(props){
    
    function getMessage(){
        const messages = [
            "Awful",
            "Bad",
            "Not Good",
            "Could be Better",
            "Decent"
        ]
        let messageIndex = 0;
        while(props.exercise.thresholds[messageIndex++] < props.value && messageIndex < messages.length);
        return messages[messageIndex-1];
    }

    const normalize = (value) => (value) * 100 / (props.exercise.max)

    const { classes } = props;

    return(
        <div className={classes.root}>
            <Grid container direction="row" justify="left" alignItems="center">
                <Grid item xs={2}>
                    <span>{getMessage()}</span>
                </Grid>
                <Grid item xs={1}>
                    <span>{ parseInt(props.value) }</span>
                </Grid>
            </Grid>
            <LinearProgress classes={{colorPrimary: classes.linearColorPrimary, barColorPrimary: classes.linearBarColorPrimary}} variant="determinate" color="primary" value={normalize(props.value)} />
        </div>
    )
}

const styles = theme => ({
        root: {
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2
        },
            linearColorPrimary: {
            backgroundColor: green50,
        },
            linearBarColorPrimary: {
            backgroundColor: green200,
        },
});

export default withStyles(styles)(MaxRange);