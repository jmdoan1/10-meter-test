import React, { Component } from 'react';
import './App.css';

import Timer from '../components/Timer/Timer';

class App extends Component {

  state = {
    time: 0,
    showTime: true,
    withProsthesis: false,
    notes: "",
    timerRunning: false,
    startTime: 0,
    stopTime: 0
  }

  toggleWithProsthesis = () => {
    this.setState({ withProsthesis: !this.state.withProsthesis });
  }

  toggleTimerRunning = () => {
    if (this.state.timerRunning) {
      this.setState({ timerRunning: false, stopTime: Date.now(), time: Date.now() - this.state.startTime });
    } else {
      this.setState({ timerRunning: true, startTime: Date.now(), stopTime: 0 });
    }
  }

  updateTime = () => {
    if (this.state.timerRunning) {
      this.setState({ time: Date.now() - this.state.startTime })
    }
  }

  toggleTimerShowing = () => {
    this.setState({ showTime: !this.state.showTime });
  }

  render() {
    let buttonText = "Start Timer"
  
    if (this.state.timerRunning) {
      buttonText = "Stop Timer"
    }

    return (
      <div className="App">
        <h1>10 Meter Walk Test</h1>
        <button onClick={this.toggleTimerRunning}>{buttonText}</button>
        <button onClick={this.updateTime}>Update Time</button>
        <h2 onClick={this.toggleTimerShowing}>{this.state.time} milliseconds ---- {this.state.time / 1000} seconds</h2>
        <Timer onClick={this.toggleTimerShowing}>{this.state.time}</Timer>
        <button onClick={this.toggleWithProsthesis}>Toggle Prosthesis</button>
        <div>
          <text>Notes:     </text>
          <input type="text" />
        </div>
        <button>Submit Time</button>
      </div>
    );
  }
}

export default App;
