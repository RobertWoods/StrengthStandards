import React from 'react';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function CalculationInformation(props){
    const standardOptions = props.standards.map((standard, ind) => 
        <MenuItem key={ind} value={standard.name}>{standard.name}</MenuItem>
    );
    const equationOptions = props.equations.map((equation, ind) =>
        <MenuItem key={ind} value={equation.name}>{equation.name}</MenuItem>
    );
    const sexOptions = ['Male', 'Female'].map((sex, ind) => 
        <MenuItem key={ind} value={sex}>{sex}</MenuItem>)

    const {classes} = props;
    
    return(
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Grid container direction="row" justify="left" alignItems="center">
                    <Grid item xs={8} sm={4}>
                        <TextField label="Weight" className="lifter-weight" type="number" onChange={(event)=>props.handler(event.target.value, false, false, false)}></TextField>
                    </Grid>

                    <Grid item xs={8} sm={4}>
                        <FormControl>
                            <InputLabel htmlFor="lifter-sex">Sex</InputLabel>
                            <Select id="lifter-sex" value={props.lifterInformation.lifterSex} onChange={(event)=>props.handler(false, event.target.value, false, false)}>
                                { sexOptions }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" justify="left" alignItems="center" className={classes.root}>
                    <Grid item xs={8} sm={4}>
                        <FormControl>
                            <InputLabel shrink htmlFor="max-equation">Equation</InputLabel>
                            <Select id="max-equation" value={props.maxInformation.equation.name} onChange={(event)=>props.handler(false, false, event.target.value, false)} >
                                { equationOptions }
                            </Select>
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={8} sm={4}>
                        <FormControl>
                            <InputLabel htmlFor="max-standards">Standard</InputLabel>
                            <Select id="max-standards" value={props.maxInformation.standards.name} onChange={(event)=>props.handler(false, false, false, event.target.value)}>
                                { standardOptions }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(CalculationInformation);