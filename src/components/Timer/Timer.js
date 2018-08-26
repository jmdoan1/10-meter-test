import React, { Component } from 'react';

import TimerLabel from './TimerLabel/TimerLabel'

class Timer extends Component {

    state = {
        time: 0,
        showTime: true,
        withProsthesis: false,
        notes: "",
        running: false,
        timeStarted: 0,
        timeStopped: 0
    }

    toggleWithProsthesis = () => {
      this.setState({ withProsthesis: !this.state.withProsthesis });
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

    render () {
        let buttonStartText = "Start Timer"
      
        if (this.state.running) {
          buttonStartText = "Stop Timer"
        }

        let buttonHideText = "Show Time"

        let timerLabel = null;

        if (this.state.showTime) {
            buttonHideText = "Hide Time";
            timerLabel = (
                <TimerLabel
                    running={this.state.timerRunning}
                    startTime={this.state.startTime}
                    time={this.state.time} >{this.state.time}</TimerLabel>
            );
        }

        return (
            <div>
                <button onClick={this.toggleRunning}>{buttonStartText}</button>
                <button onClick={this.toggleTimerShowing}>{buttonHideText}</button>
                <div>
                    {timerLabel}
                </div>
                <button onClick={this.toggleWithProsthesis}>Toggle Prosthesis</button>
                <div>
                    <label>Notes:     </label>
                    <input type="text" />
                </div>
                <button>Submit Time</button>
            </div>
        )
    };
}

export default Timer;