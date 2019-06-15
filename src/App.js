import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      result: '0'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    // console.log((/number/).test(e.target.className));
    // console.log(e.target.value);
    if (e.target.value === 'AC') {
      this.setState({
        input: '',
        result: '0'
      })
    }
    if ((/number/).test(e.target.className)) {
      if (this.state.result !== '0') {
        this.setState({
          input: this.state.input + e.target.value,
          result: this.state.result + e.target.value
        });
      } else if (e.target.value !== '0') {
        this.setState({
          input: e.target.value,
          result: e.target.value
        });
      }
    }
    
    // console.log(this.state.result.length);
    // console.log(this.state.result[this.state.result.length -1]);
    if ((/operator/).test(e.target.className)) {
      if (this.state.result !== '0') {
        // console.log((/[+-/x]/).test(this.state.result[this.state.result.length - 1]));
        if (!(/[+-/x]/).test(this.state.result[this.state.result.length - 1])) {
          this.setState({
            input: this.state.input + e.target.value,
            result: this.state.result + e.target.value
          });
        } else {
          // console.log('here, ' + this.state.input.slice(0, this.state.input.length - 1));
          this.setState({
            input: this.state.input.slice(0, this.state.input.length - 1) + e.target.value.replace(/x/, '*'),
            result: this.state.input.slice(0, this.state.input.length - 1) + e.target.value.replace(/x/, '*')
          });
        }
      }
    }
  }

  render() {
    return (
      <div id="container">
        <div id="calculator">
          <div id="display">
            <p id="displayInput">{this.state.input}</p>
            <p id="displayCurrent">{this.state.result}</p>
          </div>
          <div id="keyPads">
            <button id="clear" className="grid" onClick={this.handleClick} value="AC">AC</button>
            <button id="divide" className="grid operator" onClick={this.handleClick} value="/">/</button>
            <button id="multiply" className="grid operator" onClick={this.handleClick} value="x">x</button>
            <button id="seven" className="grid number" onClick={this.handleClick} value="7">7</button>
            <button id="eight" className="grid number" onClick={this.handleClick} value="8">8</button>
            <button id="nine" className="grid number" onClick={this.handleClick} value="9">9</button>
            <button id="subtract" className="grid operator" onClick={this.handleClick} value="-">-</button>
            <button id="four" className="grid number" onClick={this.handleClick} value="4">4</button>
            <button id="five" className="grid number" onClick={this.handleClick} value="5">5</button>
            <button id="six" className="grid number" onClick={this.handleClick} value="6">6</button>
            <button id="add" className="grid operator" onClick={this.handleClick} value="+">+</button>
            <button id="one" className="grid number" onClick={this.handleClick} value="1">1</button>
            <button id="two" className="grid number" onClick={this.handleClick} value="2">2</button>
            <button id="three" className="grid number" onClick={this.handleClick} value="3">3</button>
            <button id="equals" className="grid" onClick={this.handleClick} value="=">=</button>
            <button id="zero" className="grid number" onClick={this.handleClick} value="0">0</button>
            <button id="decimal" className="grid number" onClick={this.handleClick} value=".">.</button>
          </div>
        </div>
        <footer>
          <p>Designed and Coded By <b>Jin Park</b></p>
        </footer>
      </div>
    );
  }
}

export default App;
