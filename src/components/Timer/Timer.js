import React, { Component } from 'react';
import './Timer.css';

import TimerLabel from './TimerLabel/TimerLabel'
import TimerInputs from './TimerInput/TimerInputs'

class Timer extends Component {

    state = {
        time: 0,
        showTime: true,
        withProsthesis: false,
        notes: "",
        running: false,
        timeStarted: 0,
        timeStopped: 0,
        showSubmissionWarning: false
    }

    toggleWithProsthesis = (event) => {
      this.setState({ withProsthesis: event.target.checked });
    }
  
    toggleRunning = () => {
      if (this.state.running) {
        this.setState({ running: false, timeStopped: Date.now(), time: Date.now() - this.state.timeStarted });
        clearInterval(this.interval);
      } else {
        this.setState({ running: true, timeStarted: Date.now(), timeStopped: 0 });
        this.interval = setInterval(() => this.updateTime(), 1);
      }
    }
  
    updateTime = () => {
      if (this.state.running) {
        if (this.state.showTime) {
            this.setState({ time: Date.now() - this.state.timeStarted })
          }
      } else {
        clearInterval(this.interval);
      }
    }

    updateNotes = (event) => {
        this.setState({notes: event.target.value})
    }
  
    toggleTimerShowing = () => {
      this.setState({ showTime: !this.state.showTime });
    }

    componentDidMount() {
        //https://stackoverflow.com/a/39426846/4948354
        this.interval = setInterval(() => this.updateTime(), 1);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    submit = () => {
        if (this.state.timeStarted > 0 && this.state.timeStopped > 0) {
            this.props.submitAction({
                timeStarted: this.state.timeStarted,
                timeStopped: this.state.timeStopped,
                time: this.state.time,
                withProsthesis: this.state.withProsthesis,
                notes: this.state.notes
            })
            this.reset()
        } else {
            this.setState({showSubmissionWarning: true})
        }
    }

    reset = () => {
        this.setState({
            time: 0,
            notes: "",
            running: false,
            timeStarted: 0,
            timeStopped: 0,
            showSubmissionWarning: false
        })
    }

    buttonReset = () => {
        this.setState({ running: false })
        this.reset()
    }

    render () {
        let buttonStartText = "Start Timer"
      
        if (this.state.running) {
          buttonStartText = "Stop Timer"
        }

        let buttonHideText = "Show Timer"

        let timerLabel = null;

        if (this.state.showTime) {
            buttonHideText = "Hide Timer";
            timerLabel = (
                <TimerLabel
                    running={this.state.timerRunning}
                    startTime={this.state.startTime}
                    time={this.state.time} />
            );
        }

        let warningLabel = null;

        if (this.state.showSubmissionWarning) {
            warningLabel = (
                <label>Nothing to submit, please complete running the timer</label>
            );
        }

        return (
            <div className="Timer">
                <button onClick={this.toggleRunning}>{buttonStartText}</button>
                <button onClick={this.toggleTimerShowing}>{buttonHideText}</button>
                <button onClick={this.buttonReset}>Reset Timer</button>
                <div>
                    {timerLabel}
                </div>
                <TimerInputs 
                    changed={this.updateNotes}
                    noteVal={this.state.notes}
                    toggle={this.toggleWithProsthesis}
                    checkVal={this.state.withProsthesis}/>
                <button onClick={this.submit}>Submit Time</button>
                <div className="WarningLabel">
                    {warningLabel}
                </div>
            </div>
        )
    };
}

export default Timer;