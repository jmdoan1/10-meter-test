import React, { Component } from 'react';
import './TestResults.css';

import TestResult from './TestResult/TestResult'
import { timeString } from '../../models/TimeString'

class TestResults extends Component {
    state = {
        filter: null
    }

    include = (result) => {
        return (this.state.filter === null || this.state.filter === result.withProsthesis)
    }

    includeWith = (result) => {
        return (result.withProsthesis === true)
    }

    includeWithout = (result) => {
        return (result.withProsthesis === false)
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

    className = (props) => {
        if (props === this.state.filter) {
            return "Selected"
        } else {
            return "Unselected"
        }
    }
    
    render () {
        const results = this.props.results
        const resultsToDisplay = results.filter(this.include)

        const resultsWithProsthesis = results.filter(this.includeWith)
        const resultsWithoutProsthesis = results.filter(this.includeWithout)

        const sumTotal = results.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgTotal = sumTotal / results.length
        
        const sumWith = resultsWithProsthesis.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgWith = sumWith / resultsWithProsthesis.length

        const sumWithout = resultsWithoutProsthesis.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgWithout = sumWithout / resultsWithoutProsthesis.length

        let averages = [<h1 className={this.className(null)+"Text"}>Avg Time: {timeString(avgTotal)}</h1>];

        if (resultsWithoutProsthesis.length > 0) {
            averages.push(<h1 className={this.className(false)+"Text"}>Avg Without Prosthesis: {timeString(avgWithout)}</h1>)
        }

        if (resultsWithProsthesis.length > 0) {
            averages.push(<h1 className={this.className(true)+"Text"}>Avg With Prosthesis: {timeString(avgWith)}</h1>)
        }

        let resultText = null;

        if (sumWith > 0 && sumWithout > 0) {
            const timeImprovement = avgWithout - avgWith
            const percentImprovement = timeImprovement / avgWithout * 100

            let textClass = "GoodText"

            if (percentImprovement < 0) {
                textClass = "BadText"
            }

            resultText = (
                <h2 className={textClass}>Improvement with prosthesis: {timeString(timeImprovement)} ({percentImprovement.toPrecision(4)}%!)</h2>
            );
        }

        const displayedResults = (
            resultsToDisplay.map((result, index) => {
                return <TestResult result={result} />
            })
        );

        return (
            <div>
                <div>
                    <label>Filter: </label>
                    <button onClick={this.clearFilter} className={this.className(null)+"Button"}>All</button>
                    <button onClick={this.filterFalse} className={this.className(false)+"Button"}>Without Prosthesis</button>
                    <button onClick={this.filterTrue} className={this.className(true)+"Button"}>With Prosthesis</button>
                </div>
                {displayedResults}
                {averages}
                {resultText}
                <button onClick={this.props.clearAction}>Clear Results</button>
            </div>
        )
    };
}

export default TestResults;