import React, { Component } from 'react';
import './App.css';

import Timer from '../components/Timer/Timer';
import TestResults from '../components/TestResults/TestResults';

class App extends Component {

  state = {
    tests: []
  }

  submit = (props) => {
    const testsCopy = [...this.state.tests]
    testsCopy.push(props)
    this.setState({tests: testsCopy})
  }

  clear = () => {
    this.setState({tests: []})
  }

  render() {
    let resultsDisplay = null;
  
    if (this.state.tests.length > 0) {
      resultsDisplay = (
        <TestResults results={this.state.tests} clearAction={this.clear}/>
      );
    }

    return (
      <div className="App">
        <h1>10 Meter Walk Test</h1>
        <Timer submitAction={this.submit}/>
        {resultsDisplay}
      </div>
    );
  }
}

export default App;
