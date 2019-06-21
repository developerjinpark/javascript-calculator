import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      result: '0',
      prevClicked: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    // console.log((/number/).test(e.target.className));
    // console.log(e.target.value);

    // handle to click an AC button
    if (e.target.id === 'clear') {
      this.setState({
        input: '',
        result: '0',
        prevClicked: 'clear'
      });
    }

    // handle to click a number button
    if ((/number/).test(e.target.className)) {
      if (this.state.prevClicked === "equals") {
        this.setState({
          input: e.target.value,
          result: e.target.value
        });
      } else if (this.state.result !== '0') {
        if ((/[+-/*]/).test(this.state.result)) {
          if (!this.state.result.includes('.')) {
            console.log('operator', this.state.result);
            this.setState({
              input: this.state.input + e.target.value,
              result: e.target.value
            });
          } else {
            this.setState({
              input: this.state.input + e.target.value,
              result: this.state.result + e.target.value
            });
          }
        } else {
          console.log('not operator');
          this.setState({
            input: this.state.input + e.target.value,
            result: this.state.result + e.target.value
          });
        }
      } else if (e.target.value !== '0') {
        this.setState({
          input: e.target.value,
          result: e.target.value
        });
      }
      this.setState({
        prevClicked: 'number'
      });
    }
    
    // console.log(this.state.result.length);
    // console.log(this.state.result[this.state.result.length -1]);

    
    // handle to click an operator button
    if ((/operator/).test(e.target.className) && this.state.result !== '0') {
      
      if (!(/[+-/*]/).test(this.state.result) || (/\./).test(this.state.result)) {
        // console.log('here, ' + this.state.input.slice(0, this.state.input.length - 1));
        if (this.state.prevClicked === 'equals') {
          this.setState({
            input: this.state.result +e.target.value.replace(/x/, '*'),
            result: e.target.value.replace(/x/, '*')
          });
        } else {
          this.setState({
            input: this.state.input + e.target.value.replace(/x/, '*'),
            result: e.target.value.replace(/x/, '*')
          });
        }
      } else {
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 1) + e.target.value.replace(/x/, '*'),
          result: e.target.value.replace(/x/, '*')
        });
      }
      this.setState({
        prevClicked: 'operator'
      });
    }

    // handle to click a decimal button
    if (e.target.id === 'decimal' && this.state.result !== '0') {
      console.log(this.state.input[this.state.input.length - 1]);
      if (!(/\./g).test(this.state.result) && !(/[+-/*]/).test(this.state.input[this.state.input.length - 1])) {
        console.log('it does not have a decimal, ' + this.state.result);
        this.setState({
          input: this.state.input + '.',
          result: this.state.result + '.'
        });
      } else {
        console.log('you are not allowed to put a decimal point');
      }
      this.setState({
        prevClicked: 'decimal'
      });
    }

    // handle to click an equal button
    if (e.target.id === 'equals') {
      let input = this.state.input;
      // console.log(formula1.split(/\D/));
      // console.log(formula1.split(/\d+/));
      let num = input.split(/\D/);
      let op = input.split(/\d+/);
      op.pop();
      op.shift();
      console.log('num: ' + num, 'op: ' + op);
      let formula1 = [];
      for (let i = 0; i < num.length; i++) {
        formula1.push(num[i]);
        if (i < op.length) {
          formula1.push(op[i]);
        }
      }
      console.log('formula1: ' + formula1);

      let indexes = [];
      let formula2 = formula1.map( (f, index) => { 
        if (f === '.') {
          indexes.unshift(index);
          return formula1[index-1] + formula1[index] + formula1[index+1];
        } else {
          return f;
        }
      });
      console.log('formula1: ' + formula2);
      console.log('indexes: ' + indexes);
      indexes.forEach( i => {
        formula2.splice(i+1, 1);
        formula2.splice(i-1, 1);
      });
      console.log('formula2: ' + formula2);
      let formula = formula2.map( (t, index) => {
        if (index % 2 === 0) {
          return parseFloat(t);
        } else {
          return t;
        }
      });
      console.log('formula: ' + formula);

      // handle to calculate for multiply and divide 
      while (formula.includes('*') || formula.includes('/')) {
        let idxOfMultiply = formula.indexOf('*');
        let idxOfDivide = formula.indexOf('/');
        console.log(idxOfMultiply, idxOfDivide);
        if (idxOfMultiply !== -1 && idxOfDivide !== -1) {
          if (idxOfMultiply < idxOfDivide) {
            formula[idxOfMultiply - 1] *= formula[idxOfMultiply + 1];
            formula.splice(idxOfMultiply, 2);
          } else {
            formula[idxOfDivide - 1] /= formula[idxOfDivide + 1];
            formula.splice(idxOfDivide, 2);
          }
        } else if (idxOfMultiply === -1) {
          formula[idxOfDivide - 1] /= formula[idxOfDivide + 1];
            formula.splice(idxOfDivide, 2);
        } else {
          formula[idxOfMultiply - 1] *= formula[idxOfMultiply + 1];
            formula.splice(idxOfMultiply, 2);
        }
      }

      // handle to calculate for add and subtract 
      while (formula.includes('+') || formula.includes('-')) {
        let idxOfAdd = formula.indexOf('+');
        let idxOfSubtract = formula.indexOf('-');
        console.log(idxOfAdd, idxOfSubtract);
        if (idxOfAdd !== -1 && idxOfSubtract !== -1) {
          if (idxOfAdd < idxOfSubtract) {
            formula[idxOfAdd - 1] += formula[idxOfAdd + 1];
            formula.splice(idxOfAdd, 2);
          } else {
            formula[idxOfSubtract - 1] -= formula[idxOfSubtract + 1];
            formula.splice(idxOfSubtract, 2);
          }
        } else if (idxOfAdd === -1) {
          formula[idxOfSubtract - 1] -= formula[idxOfSubtract + 1];
            formula.splice(idxOfSubtract, 2);
        } else {
          formula[idxOfAdd - 1] += formula[idxOfAdd + 1];
            formula.splice(idxOfAdd, 2);
        }
      }
      console.log('formula: ' + formula);

      this.setState({
        input: this.state.input + '=' + formula,
        result: formula,
        prevClicked: 'equals'
      });
    }
  }

  render() {
    return (
      <div id="container">
        <div id="calculator">
          <div id="displayWarp">
            <p id="displayInput">{this.state.input}</p>
            <p id="display">{this.state.result}</p>
          </div>
          <div id="keyPads">
            <button id="clear" className="grid" onClick={this.handleClick}>AC</button>
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
            <button id="decimal" className="grid" onClick={this.handleClick} value=".">.</button>
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
