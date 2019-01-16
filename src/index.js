import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StrengthStandards from './StrengthStandards';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <StrengthStandards/>
    </MuiThemeProvider>
, document.getElementById('root'));