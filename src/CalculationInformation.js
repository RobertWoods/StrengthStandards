import React from 'react';
import './index.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';

export default function CalculationInformation(props){
    const standardOptions = props.standards.map((standard, ind) => 
        <MenuItem key={ind} value={standard.name}>{standard.name}</MenuItem>
    );
    const equationOptions = props.equations.map((equation, ind) =>
        <MenuItem key={ind} value={equation.name}>{equation.name}</MenuItem>
    );
    const sexOptions = ['Male', 'Female'].map((sex, ind) => 
        <MenuItem key={ind} value={sex}>{sex}</MenuItem>)
    return(
        <div>
            <TextField label="Weight" className="lifter-weight" type="number" onChange={(event)=>props.handler(event.target.value, false, false, false)}></TextField>

            <FormControl variant="filled">
                <InputLabel htmlFor="lifter-sex">Sex</InputLabel>
                <Select id="lifter-sex" value={props.lifterInformation.lifterSex} onChange={(event)=>props.handler(false, event.target.value, false, false)}>
                    { sexOptions }
                </Select>
            </FormControl>
            <br/>

            <FormControl variant="filled">
                <InputLabel htmlFor="max-equation">Equation</InputLabel>
                <Select id="max-equation" value={props.maxInformation.equation.name} onChange={(event)=>props.handler(false, false, event.target.value, false)}>
                    { equationOptions }
                </Select>
            </FormControl>

            <FormControl variant="filled">
                <InputLabel htmlFor="max-standards">Standard</InputLabel>
                <Select id="max-standards" value={props.maxInformation.standards.name} onChange={(event)=>props.handler(false, false, false, event.target.value)}>
                    { standardOptions }
                </Select>
            </FormControl>
        </div>
    )
}

