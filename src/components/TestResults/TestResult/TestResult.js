import React, { Component } from 'react';
import './TestResult.css'

import { timeString } from '../../../models/TimeString';

class TestResult extends Component {
    render () {
        const result = this.props.result
        return (
            <div className="MainDiv">
                <div className="ResultDiv">
                    <label className="ResultLabel">Time: {timeString(result.time)}</label>
                </div>
                <div className="ResultDiv">
                    <label className="ResultLabel">With Prosthesis?: {result.withProsthesis.toString()}</label>
                </div>
                <div className="ResultDiv">
                    <label className="ResultLabel">Notes: {result.notes}</label>
                </div>
            </div>
        )
    };
}

export default TestResult;