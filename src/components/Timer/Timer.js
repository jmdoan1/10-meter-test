import React, { Component } from 'react';
import './Timer.css';

import TimerLabel from './TimerLabel/TimerLabel'
import TimerInputs from './TimerInputs/TimerInputs'

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

    timeInterval = 25 //not too much but still "visually blurry"

    //"With prosthesis" value will reflect checkbox 
    setWithProsthesis = (event) => {
      this.setState({ withProsthesis: event.target.checked });
    }
  
    toggleRunning = () => {
      if (this.state.running) {
        this.setState({ running: false, timeStopped: Date.now(), time: Date.now() - this.state.timeStarted });
        clearInterval(this.interval); //cancel auto-refreshing interval when not necessary
      } else {
        this.setState({ running: true, timeStarted: Date.now(), timeStopped: 0 }); //timeStopped value needs to equal 0 when timer is running. Non-zero value is used to determine completion
        this.interval = setInterval(() => this.updateTime(), this.timeInterval); //restart auto-refreshing interval when necessary
      }
    }
  
    updateTime = () => {
      if (this.state.running) {
        if (this.state.showTime) {
            this.setState({ time: Date.now() - this.state.timeStarted })
          }
      } else {
        clearInterval(this.interval); //if timer isn't running, go ahead and cancel.
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
        this.interval = setInterval(() => this.updateTime(), this.timeInterval); //start checking for time updates immediately
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    submit = () => {
        //Check if timer has been run and stopped
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
            //Warn the user they can't submit
            this.setState({showSubmissionWarning: true})
        }
    }

    reset = () => {
        //reset everything except withProsthesis and showTimer toggles
        this.setState({
            time: 0,
            notes: "",
            running: false,
            timeStarted: 0,
            timeStopped: 0,
            showSubmissionWarning: false
        })
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
                <button onClick={this.reset}>Reset Timer</button>
                <div>
                    {timerLabel}
                </div>
                <TimerInputs 
                    changed={this.updateNotes} //passed to text input
                    noteVal={this.state.notes} //passed to text input
                    toggle={this.setWithProsthesis} //passed to checkbox input
                    checkVal={this.state.withProsthesis} //passed to checkbox input
                    />
                <button onClick={this.submit}>Submit Time</button>
                <div className="WarningLabel">
                    {warningLabel}
                </div>
            </div>
        )
    };
}

export default Timer;