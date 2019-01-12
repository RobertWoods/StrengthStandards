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
            <span>{ parseInt(props.value) }</span>
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
                <label>
                    {this.props.exercise.name}
                    <span>Reps</span><input type="number" className="repsInput" onChange={this.handleChange}/>
                    <span><span>Weight</span><input className="weightInput" type="number" onChange={this.handleChange}/></span>
                </label>
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

function CalculationInformation(props){
    const standardOptions = props.standards.map((standard, ind) => 
        <option key={ind} value={standard.name}>{standard.name}</option>
    );
    const equationOptions = props.equations.map((equation, ind) =>
        <option key={ind} value={equation.name}>{equation.name}</option>
    );
    return(
        <div>
            <label>Weight
                <input className="lifter-weight" type="text" onChange={(event)=>props.handler(event.target.value, false, false, false)}></input>
            </label>
            <label>Sex
                <input className="lifter-sex" type="text" onChange={(event)=>props.handler(false, event.target.value, false, false)}></input>
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

class StrengthStandards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lifterInformation:{
                lifterWeight: 0,
                lifterSex: "Female"
            },
            maxInformation: {
                equation: this.equationList[0],
                standards: this.standardsList[0]
            }
        }
        this.handleCalculationChange = this.handleCalculationChange.bind(this);
    };

    standardsList = [
        {
            name: 'I rock'
        },
        {
            name: 'I roll'
        }
    ]

    equationList = [
        {
            name: "Wendler",
            equation: (reps,weight) => (0.03333 * Number(reps) * Number(weight)) + Number(weight)
        },
        {
            name: "Wacky",
            equation: (reps, weight) => weight
        }
    ]

    getMaxEquationFromName(name){
        return this.equationList.reduce((acc, curr) => {
            if(curr.name===name) return curr;
            return acc;
        });
    }

    handleCalculationChange(lifterWeight, lifterSex, equation, standards){
        this.setState({
            lifterInformation: {
                lifterWeight: lifterWeight ? lifterWeight : this.state.lifterInformation.lifterWeight,
                lifterSex: lifterSex ? lifterSex : this.state.lifterInformation.lifterSex
            },
            maxInformation: {
                equation: equation ? this.getMaxEquationFromName(equation) : this.state.maxInformation.equation,
                standards: standards ? standards : this.state.maxInformation.standards
            }
        })
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <CalculationInformation handler={this.handleCalculationChange} standards={this.standardsList} equations={this.equationList}/>
                <ExerciseMaxForm lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation}/>
            </div>
        )
    }

}

ReactDOM.render(<StrengthStandards/>, document.getElementById('root'));