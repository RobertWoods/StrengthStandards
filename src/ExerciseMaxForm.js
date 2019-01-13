import StatusBoard from './StatusBoard';
import React from 'react';
import './index.css';

export default function ExerciseMaxForm(props) {
    const boards = props.maxInformation.standards.standards.map((item, ind)=>{
        return(
            <StatusBoard exercise={item} key={ind} maxEquation={ props.maxInformation.equation.equation }/>
        )
    })
    return(
        <div>
            {boards}
        </div>
    )
}