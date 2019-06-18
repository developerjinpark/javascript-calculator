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

    // handle to click an AC button
    if (e.target.id === 'clear') {
      this.setState({
        input: '',
        result: '0'
      })
    }

    // handle to click a number button
    if ((/number/).test(e.target.className)) {
      if (this.state.result !== '0') {
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
            })
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
    }
    
    // console.log(this.state.result.length);
    // console.log(this.state.result[this.state.result.length -1]);

    // handle to click an operator button
    if ((/operator/).test(e.target.className)) {
      if (this.state.result !== '0') {
        // console.log(e.target.value);
        // console.log((/[+-/*x]/).test(e.target.value));
        // if (!(/[+-/x]/).test(e.target.value)) {
        //   this.setState({
        //     input: this.state.input + e.target.value,
        //     result: this.state.result + e.target.value
        //   });
        // } else 
        if (!(/[+-/*]/).test(this.state.input[this.state.input.length - 1])) {
          // console.log('here, ' + this.state.input.slice(0, this.state.input.length - 1));
          this.setState({
            input: this.state.input + e.target.value.replace(/x/, '*'),
            result: e.target.value.replace(/x/, '*')
          });
        } else {
          this.setState({
            input: this.state.input.slice(0, this.state.input.length - 1) + e.target.value.replace(/x/, '*'),
            result: e.target.value.replace(/x/, '*')
          })
        }
      }
    }

    // handle to click a decimal button
    if (e.target.id === 'decimal') {
      if (this.state.result !== '0') {
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
      }
    }

    // // handle to click an equal button
    // if (e.target.id === 'equals') {
    //   let input = this.state.input;
    //   // console.log(formula.split(/\D/));
    //   // console.log(formula.split(/\d+/));
    //   let num = input.split(/\D/);
    //   let op = input.split(/\d+/);
    //   op.pop();
    //   op.shift();
    //   console.log('num: ' + num, 'op: ' + op);
    //   let formula = [];
    //   for (let i = 0; i < num.length; i++) {
    //     formula.push(num[i]);
    //     formula.push(op[i]);
    //   }
    //   console.log('formula: ' + formula);

    //   if(formula.includes('.')) {
    //     let index = formula.indexOf('.');
    //     console.log('index: ' + index);
    //     let decimal = formula[index - 1] + formula[index] + formula[index + 1];
    //     let temp = formula.map( (f, index) => { 
    //       if (f === '.') {
    //         let t = formula[index-1] + formula[index] + formula[index+1];
    //         temp.splice(index-1, 1);
    //         formula.splice(index, 1);
    //         return t;
    //       } else {
    //         return f;
    //       }
    //     });
    //     console.log('formula: ' + temp);
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
