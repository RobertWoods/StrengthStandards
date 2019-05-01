import React from 'react';
import './index.css';
import ExerciseMaxForm from './ExerciseMaxForm';
import CalculationInformation from './CalculationInformation';
import { withStyles, Grid } from '@material-ui/core';
import { Paper, CssBaseline } from '@material-ui/core';
import { lightGreen50 } from 'material-ui/styles/colors';
import MyAppBar from './MyAppBar';

class StrengthStandards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lifterInformation: {
                lifterWeight: 0,
                lifterSex: "Male"
            },
            maxInformation: {
                equation: this.equationList[0],
                standards: this.standardsList[0]
            },
            loggedIn: localStorage.getItem('token')
        }
        this.handleCalculationChange = this.handleCalculationChange.bind(this);
    };

    standardsList = [
        {
            name: 'Decently High',
            standards: [
                {
                    name: "Bench Press",
                    max: 500,
                    thresholds: [100, 200, 300, 400, 500]
                },
                {
                    name: "Squat",
                    max: 800,
                    thresholds: [200, 400, 500, 600, 800]
                },
                {
                    name: "Deadlift",
                    max: 900,
                    thresholds: [250, 500, 600, 750, 900]
                }
            ]
        },
        {
            name: 'Very Low',
            standards: [
                {
                    name: "Bench Press",
                    max: 10,
                    thresholds: [1, 2, 3, 4, 5]
                },
                {
                    name: "Squat",
                    max: 10,
                    thresholds: [1, 2, 3, 4, 5]
                },
                {
                    name: "Deadlift",
                    max: 10,
                    thresholds: [1, 2, 3, 4, 5]
                }
            ]
        }
    ]

    equationList = [
        {
            name: "Wendler",
            equation: (reps, weight) => (0.03333 * Number(reps) * Number(weight)) + Number(weight)
        },
        {
            name: "None",
            equation: (reps, weight) => weight
        }
    ]

    getKeyFromName(name, list) {
        return list.reduce((acc, curr) => {
            if (curr.name === name) return curr;
            return acc;
        });
    }

    handleCalculationChange(lifterWeight, lifterSex, equation, standards) {
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

    handleLoginState = loggedIn => {
        this.setState({loggedIn: loggedIn}) 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <CssBaseline />
                <MyAppBar handler={this.handleLoginState} loggedIn={this.state.loggedIn}></MyAppBar>
                <Grid container spacing={16}>
                    <Grid item sm={12} md={3}>
                        <Paper className={classes.paper} >
                            <CalculationInformation handler={this.handleCalculationChange} standards={this.standardsList} equations={this.equationList} lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation} />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={9}>
                        <Paper className={classes.paper} >
                            <ExerciseMaxForm lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = theme => ({
    paper: {
        marginBottom: theme.spacing.unit,
        backgroundColor: lightGreen50,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            padding: theme.spacing.unit * 3,
        }
    }
});

export default withStyles(styles)(StrengthStandards);