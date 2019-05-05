import React from 'react';
import './index.css';
import MaxRange from './MaxRange';
import TextField from '@material-ui/core/TextField';
import { InputLabel } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

export default class StatusBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            reps: 0,
            weight: 0
        };

        //Research why binding is required
        this.handleChange = this.handleChange.bind(this);
    }

    getMax(){
        if(Number(this.state.reps) === 1) return this.state.weight;
        return this.props.maxEquation(this.state.reps, this.state.weight)
    }

    handleChange(event){
        const target = event.target.id;
        this.setState({
            reps:   target === 'repsInput' ? event.target.value : this.state.reps,
            weight: target === 'weightInput' ? event.target.value : this.state.weight,
        })
    }

    BlackInputLabel = styled(InputLabel)({
        color: 'black'
    });

    adornments = ['Weight', 'Reps'].map((value, ind) => {return {startAdornment: <InputAdornment position="start">{value}</InputAdornment>} });

    render(){
        return(
            <div>
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={16}>
                    <Grid item md={3}>
                        <TextField label={this.props.exercise.name} id="weightInput" InputProps={this.adornments[0]} type="number" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item md={3}>
                        <TextField label=' ' id="repsInput" InputProps={this.adornments[1]} type="number" onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                <MaxRange exercise={this.props.exercise} value={this.getMax()}/>
            </div>
        )
    }
}