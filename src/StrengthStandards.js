import React from 'react';
import './index.css';
import ExerciseMaxForm from './ExerciseMaxForm';
import CalculationInformation from './CalculationInformation';
import { withStyles, Grid, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Paper, CssBaseline } from '@material-ui/core';
import { lightGreen50, lightGreen200 } from 'material-ui/styles/colors';

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
            name: 'Decently High',
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
            name: 'Very Low',
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
            name: "None",
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
                <AppBar className={classes.appBar} position="static" color="default">
                    <Toolbar>
                    <Typography className={classes.appBarTitle} component="h2" variant="h5" align="center" color="inherit" noWrap>
                        Strength Standards
                    </Typography>
                    <Button variant="outlined" size="small">
                        Sign Up
                    </Button>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={16} className={classes.layout}>
                    <Grid item sm={12} md={3}>
                        <Paper className={classes.paper} >
                            <CalculationInformation handler={this.handleCalculationChange} standards={this.standardsList} equations={this.equationList} lifterInformation={this.state.lifterInformation} maxInformation={this.state.maxInformation}/>
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
      },
    appBar: {
        backgroundColor: lightGreen200,
        marginBottom: theme.spacing.unit * 2
    },
    appBarTitle: {
        flex: 1
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
    }
  });

export default withStyles(styles)(StrengthStandards);