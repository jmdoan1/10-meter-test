import React, { Component } from 'react';
import './App.css';

import Timer from '../components/Timer/Timer'

class App extends Component {

  state = {
    tests: []
  }

  submit = (props) => {
    const testsCopy = [...this.state.tests]
    testsCopy.push(props)
    this.setState({tests: testsCopy})
  }

  render() {
    return (
      <div className="App">
        <h1>10 Meter Walk Test</h1>
        <Timer 
          submitAction={this.submit}/>
      </div>
    );
  }
}

export default App;
