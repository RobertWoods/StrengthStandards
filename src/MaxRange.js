import React from 'react';
import './index.css';

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

    return(
        <div>
            <span>{ parseInt(props.value) }</span>
            <input type="range" min="0" max={props.exercise.max} value={props.value} readOnly={true} title="Hello"/>
            <span>{getMessage()}</span>
        </div>
    )
}