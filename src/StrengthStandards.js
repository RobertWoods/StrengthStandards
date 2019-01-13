import React from 'react';
import './index.css';
import ExerciseMaxForm from './ExerciseMaxForm';
import CalculationInformation from './CalculationInformation';

export default class StrengthStandards extends React.Component {
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