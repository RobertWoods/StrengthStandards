import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

    return(
        <div>
            <input type="range" min="0" max={props.exercise.max} value={props.value} readOnly={true} title="Hello"/>
            <span>{getMessage()}</span>
        </div>
    )
}

class StatusBoard extends React.Component {
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
        if(Number(this.props.reps) === 1) return this.props.weight;
        return this.props.maxEquation(this.state.reps, this.state.weight)
    }

    handleChange(event){
        const target = event.target.className;
        this.setState({
            reps:   target === 'repsInput' ? event.target.value : this.state.reps,
            weight: target === 'weightInput' ? event.target.value : this.state.weight,
        })
    }

    render(){
        return(
            <div>
                <div>
                    <span>{this.props.exercise.name}</span>
                    <span>Reps</span><input type="number" className="repsInput" onChange={this.handleChange}/>
                    <span><span>Weight</span><input className="weightInput" type="number" onChange={this.handleChange}/></span>
                </div>
                <MaxRange exercise={this.props.exercise} value={this.getMax()}/>
            </div>
        )
    }
}

class ExerciseMaxForm extends React.Component {
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
                <StatusBoard exercise={item} key={ind} maxEquation={ (reps,weight)=>(0.03333 * Number(reps) * Number(weight)) + Number(weight) }/>
            )
        })
        return(
            <div>
                {boards}
            </div>
        )
    }
}

const input = { max: 100 };
ReactDOM.render(<ExerciseMaxForm/>, document.getElementById('root'));