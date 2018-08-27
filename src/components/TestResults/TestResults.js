import React, { Component } from 'react';
import './TestResults.css';

import TestResult from './TestResult/TestResult'

class TestResults extends Component {
    state = {
        filter: null
    }

    include = (result) => {
        return (this.state.filter === null || this.state.filter === result.withProsthesis)
    }

    clearFilter = () => {
        this.setState({filter: null})
    }

    filterTrue = () => {
        this.setState({filter: true})
    }

    filterFalse = () => {
        this.setState({filter: false})
    }

    render () {
        const results = this.props.results
        const resultsToDisplay = results.filter(this.include)

        const displayedResults = (
            resultsToDisplay.map((result, index) => {
                return <TestResult result={result} />
            })
        );

        let buttons = null;

        if (results.length > 0) {
            buttons = (
                <div>
                    <button onClick={this.clearFilter}>All</button>
                    <button onClick={this.filterTrue}>With Prosthesis</button>
                    <button onClick={this.filterFalse}>Without Prosthesis</button>
                </div>
            );
        }

        return (
            <div>
                {buttons}
                {displayedResults}
            </div>
        )
    };
}

export default TestResults;