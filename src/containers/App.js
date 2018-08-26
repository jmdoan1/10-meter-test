import React, { Component } from 'react';
import './App.css';

import Timer from '../components/Timer/Timer'

class App extends Component {

  state = {}

  render() {
    return (
      <div className="App">
        <h1>10 Meter Walk Test</h1>
        <Timer />
      </div>
    );
  }
}

export default App;
