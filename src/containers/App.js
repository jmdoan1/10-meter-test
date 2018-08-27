import React, { Component } from 'react';
import './App.css';

import Timer from '../components/Timer/Timer';
import TestResults from '../components/TestResults/TestResults';

class App extends Component {

  state = {
    testResults: []
  }

  //Accepts test result data and adds to state
  submit = (props) => {
    const testsCopy = [...this.state.testResults]
    testsCopy.push(props)
    this.setState({testResults: testsCopy})
  }

  clear = () => {
    this.setState({testResults: []})
  }

  render() {
    let resultsDisplay = null;
  
    //Only show results section if there are results
    if (this.state.testResults.length > 0) {
      resultsDisplay = (
        <TestResults results={this.state.testResults} clearAction={this.clear}/>
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
