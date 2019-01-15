import React from 'react';
import './index.css';

export default function CalculationInformation(props){
    const standardOptions = props.standards.map((standard, ind) => 
        <option key={ind} value={standard.name}>{standard.name}</option>
    );
    const equationOptions = props.equations.map((equation, ind) =>
        <option key={ind} value={equation.name}>{equation.name}</option>
    );
    const sexOptions = ['Male', 'Female'].map((sex, ind) => 
        <option key={ind} value={sex}>{sex}</option>)
    return(
        <div>
            <label>Weight
                <input className="lifter-weight" type="text" onChange={(event)=>props.handler(event.target.value, false, false, false)}></input>
            </label>
            <label>Sex
                <select className="lifter-sex" type="text" onChange={(event)=>props.handler(false, event.target.value, false, false)}>
                    { sexOptions }
                </select>
            </label>
            <br/>
            <label>Equation
                <select className="max-equation" type="text" onChange={(event)=>props.handler(false, false, event.target.value, false)}>
                    { equationOptions }
                </select>
            </label>
            <label>Standards
                <select className="max-standards" onChange={(event)=>props.handler(false, false, false, event.target.value)}>
                    { standardOptions }
                </select>
            </label>
        </div>
    )
}

