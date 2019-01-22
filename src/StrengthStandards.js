import React from 'react';
import './index.css';
import ExerciseMaxForm from './ExerciseMaxForm';
import CalculationInformation from './CalculationInformation';
import { withStyles } from '@material-ui/core';
import { Paper, CssBaseline } from '@material-ui/core';
import { lightGreen50 } from 'material-ui/styles/colors';

class StrengthStandards extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lifterInformation:{
                lifterWeight: 0,
                lifterSex: "Male"
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
            name: 'I rock',
            standards: [
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
            ]
        },
        {
            name: 'I roll',
            standards: [
                {
                    name: "Bench Press",
                    max: 10,
                    thresholds: [1,2,3,4,5]
                },
                {
                    name: "Squat",
                    max: 10,
                    thresholds: [1,2,3,4,5]
                },
                {
                    name: "Deadlift",
                    max: 10,
                    thresholds: [1,2,3,4,5]
                }
            ]
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

    getKeyFromName(name, list){
        return list.reduce((acc, curr) => {
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
                equation: equation ? this.getKeyFromName(equation, this.equationList) : this.state.maxInformation.equation,
                standards: standards ? this.getKeyFromName(standards, this.standardsList) : this.state.maxInformation.standards
            }
        });
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <CssBaseline />
                <Paper className={classes.paper} >
                    <CalculationInformation handler={this.handleCalculationChange} standards={this.standardsList} equations={this.equationList} lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation}/>
                </Paper>
                <Paper className={classes.paper} >
                    <ExerciseMaxForm lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation} />
                </Paper>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        backgroundColor: lightGreen50,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }
  });

export default withStyles(styles)(StrengthStandards);