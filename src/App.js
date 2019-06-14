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
    // console.log(e.target);
    // if ((/number/).test(e.target.className)) {
    //   if (this.state.result !== '0') {
    //     this.setState({
    //       result: this.state.result + e.target.value
    //     });
    //   } else if (e.target.value !== '0') {
    //     this.setState({
    //       result: e.target.value
    //     });
    //   }
    // } 
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
            <div id="clear" className="grid" onClick={this.handleClick}><p>AC</p></div>
            <div id="divide" className="grid operator" onClick={this.handleClick}>/</div>
            <div id="multiply" className="grid operator" onClick={this.handleClick}>X</div>
            <div id="seven" className="grid number" onClick={this.handleClick}>7</div>
            <div id="eight" className="grid number" onClick={this.handleClick}>8</div>
            <div id="nine" className="grid number" onClick={this.handleClick}>9</div>
            <div id="subtract" className="grid operator" onClick={this.handleClick}>-</div>
            <div id="four" className="grid number" onClick={this.handleClick}>4</div>
            <div id="five" className="grid number" onClick={this.handleClick}>5</div>
            <div id="six" className="grid number" onClick={this.handleClick}>6</div>
            <div id="add" className="grid operator" onClick={this.handleClick}>+</div>
            <div id="one" className="grid number" onClick={this.handleClick}>1</div>
            <div id="two" className="grid number" onClick={this.handleClick}>2</div>
            <div id="three" className="grid number" onClick={this.handleClick}>3</div>
            <div id="equals" className="grid" onClick={this.handleClick}>=</div>
            <div id="zero" className="grid number" onClick={this.handleClick}>0</div>
            <div id="decimal" className="grid number" onClick={this.handleClick}>.</div>
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
