import React from 'react';
import './index.css';
import MaxRange from './MaxRange';
import TextField from '@material-ui/core/TextField';
import { InputLabel, TableBody, Table, TableCell, TableRow } from '@material-ui/core';
import { styled } from '@material-ui/styles';

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

    render(){
        return(
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                {this.props.exercise.name}
                            </TableCell>
                            
                            <TableCell>
                                <TextField id="repsInput" label="Reps" type="number" onChange={this.handleChange}/>
                            </TableCell>
                            
                            <TableCell>
                                <TextField id="weightInput" label="Weight" type="number" onChange={this.handleChange}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <MaxRange exercise={this.props.exercise} value={this.getMax()}/>
            </div>
        )
    }
}