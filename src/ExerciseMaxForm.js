import StatusBoard from './StatusBoard';
import React from 'react';
import './index.css';

export default class ExerciseMaxForm extends React.Component {
    render(){
        const exercises = [
            {
                name: "Bench Press",
                max: 500,
                thresholds: [100,200,300,400,500]
            },
            {
                name: "Squat",
                max: 800,
                thresholds: [200,400,500,600,800]
            },
            {
                name: "Deadlift",
                max: 900,
                thresholds: [250,500,600,750,900]
            }
        ];

        const boards = exercises.map((item, ind)=>{
            return(
                <StatusBoard exercise={item} key={ind} maxEquation={ this.props.maxInformation.equation.equation }/>
            )
        })
        return(
            <div>
                {boards}
            </div>
        )
    }
}