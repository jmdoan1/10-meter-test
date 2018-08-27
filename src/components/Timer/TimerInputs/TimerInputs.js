import React, { Component } from 'react';

class TimerInputs extends Component {
    render () {
        return (
            <div>
                <label>
                    With Prosthesis:
                    <input 
                        type="checkbox"
                        checked={this.props.checkVal}
                        onChange={this.props.toggle} />
                </label>
                <div />
                <label>
                    Notes:
                    <input 
                        type="text" 
                        onChange={this.props.changed} 
                        value={this.props.noteVal}/>
                </label>
            </div>
        )
    };
}

export default TimerInputs;