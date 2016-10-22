import React, { Component } from 'react';
import IncorrectBox from './IncorrectBox'
import logo from '../logo.svg';
import '../App.css';
import randomWords from 'random-words';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      word: '',
      letters: [],
      gameplay: [],
      inputValue: '',
      guess: '',
      incorrectLetters: []
    }

    this.inputLetter = this.inputLetter.bind(this)
    this.replaceIt = this.replaceIt.bind(this)
    this.findIt = this.findIt.bind(this)
    this.getReference = this.getReference.bind(this)
  }

  componentDidMount() {
    this.newWord();
  }

  newWord() {
    const word = randomWords()
    this.setState({
      word,
      inputValue: '',
      letters: word.split(''),
      gameplay: word
        .split('')
        .map(x => '_')
    })
    this.input.focus()
  }

  inputLetter(e) {
    const {word} = this.state
    const {value} = e.target

    this.setState({ 
      inputValue: '', 
      guess: value
    })

    if (word.includes(value)) {
      const indices = this.findIt(value);
      this.setState({ gameplay: this.replaceIt(value, indices) })
    } else {
      this.setState({
        incorrectLetters: this.state.incorrectLetters.concat([value])
      })
    }
  }

  findIt(letter) {
    return this.state.letters
      .map((x, i) => x === letter ? {letter: x, index: i} : false)
      .filter((x, i) => x.letter)
      .map(x => x.index)
  }

  replaceIt(letter, indices) {
    return this.state.gameplay
      .map((x, i) => console.log(indices.toString().includes(i), x, i) || indices.toString().includes(i) ? letter : x)
  }

  getReference(input) {
    if (!!input) {
      this.input = input
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="guess">{this.state.guess}</div>
          <h2>
            {this.state.gameplay.map((x, i) =>
              <div key={i} className="letter">{x}</div>
            )}
          </h2>
        </div>
        
        <p className="App-intro">
          <input 
            type="text" 
            ref={this.getReference}
            value={this.state.inputValue}
            onChange={this.inputLetter} />
        </p>

        <IncorrectBox letters={this.state.incorrectLetters} />
      </div>
    );
  }
}

export default App;