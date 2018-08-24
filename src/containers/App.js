import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    time: "0:00:00",
    showTime: true,
    withProsthesis: false,
    notes: "",
    timerRunning: false
  }

  toggleWithProsthesis = () => {
    if (this.state.withProsthesis) {
      this.setState({ withProsthesis: false });
    } else {
      this.setState({ withProsthesis: true });
    }
  }

  toggleTimerRunning = () => {
    if (this.state.timerRunning) {
      this.setState({ timerRunning: false });
    } else {
      this.setState({ timerRunning: true });
    }
  }

  toggleTimerShowing = () => {
    if (this.state.showTime) {
      this.setState({ showTime: false });
    } else {
      this.setState({ showTime: true });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>10 Meter Walk Test</h1>
        <button onClick={this.toggleTimerRunning}>Start Timer</button>
        <h2 onClick={this.toggleTimerShowing}>{this.state.time}</h2>
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
