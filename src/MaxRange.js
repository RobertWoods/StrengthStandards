import React from 'react';
import './index.css';
import { LinearProgress } from '@material-ui/core';

export default function MaxRange(props){
    
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
    return(
        <div>
            <LinearProgress variant="determinate" value={normalize(props.value)} />
            <span>{ parseInt(props.value) }</span>
            <span>{getMessage()}</span>
        </div>
    )
}