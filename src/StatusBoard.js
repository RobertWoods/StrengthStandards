import React from 'react';
import './index.css';
import MaxRange from './MaxRange';

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