import React, { Component } from 'react';
import './TestResults.css';

import TestResult from './TestResult/TestResult'
import { timeString } from '../../models/TimeString'

class TestResults extends Component {
    state = {
        displayFilter: null
    }

    include = (result) => {
        //if filter is null, include all, otherwise check against prosthesis flag
        return (this.state.displayFilter === null || this.state.displayFilter === result.withProsthesis)
    }

    includeWith = (result) => {
        //Return everything "With" prosthesis
        return (result.withProsthesis === true)
    }

    includeWithout = (result) => {
        //Return everything "Without" prosthesis
        return (result.withProsthesis === false)
    }

    clearFilter = () => {
        this.setState({displayFilter: null})
    }

    filterTrue = () => {
        this.setState({displayFilter: true})
    }

    filterFalse = () => {
        this.setState({displayFilter: false})
    }

    //determine both SelectedButton and SelectedText classnames for below
    className = (props) => {
        if (props === this.state.displayFilter) {
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

        //Total and avg times for all tests
        const sumTotal = results.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgTotal = sumTotal / results.length
        
        //Total and avg times for tests w/ prosthesis
        const sumWith = resultsWithProsthesis.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgWith = sumWith / resultsWithProsthesis.length

        //Total and avg times for tests w/o prosthesis
        const sumWithout = resultsWithoutProsthesis.reduce(function(sum, res) {
            return sum + res.time;
        }, 0);
        const avgWithout = sumWithout / resultsWithoutProsthesis.length

        //Always show the main avg. time (will default to 0:00:00 wih timeString)
        let averages = [<h1 key="All" className={this.className(null)+"Text"}>Avg Time: {timeString(avgTotal)}</h1>];

        //Only show other avgs when relevant
        if (resultsWithoutProsthesis.length > 0) {
            averages.push(<h1 key="Without" className={this.className(false)+"Text"}>Avg Without Prosthesis: {timeString(avgWithout)}</h1>)
        }

        if (resultsWithProsthesis.length > 0) {
            averages.push(<h1 key="With" className={this.className(true)+"Text"}>Avg With Prosthesis: {timeString(avgWith)}</h1>)
        }

        let resultText = null;

        if (sumWith > 0 && sumWithout > 0) {
            const timeImprovement = avgWithout - avgWith
            const percentImprovement = timeImprovement / avgWithout * 100

            let textClass = "GoodText" // :)

            if (percentImprovement < 0) {
                textClass = "BadText" // :( maybe don't submit this one to the insurance co.
            }

            resultText = (
                <h2 className={textClass}>Improvement with prosthesis: {timeString(timeImprovement)} ({percentImprovement.toPrecision(4)}%!)</h2>
            );
        }

        //returns array of TestResult objects based on what's filtered to displayedResults
        const displayedResults = (
            resultsToDisplay.map((result, index) => {
                return <TestResult key={index} result={result} />
            })
        );

        return (
            <div>
                <h1>Test Results</h1>
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