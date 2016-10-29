import React, { Component } from 'react';
import IncorrectBox from './IncorrectBox';
import NumLives from './NumLives';
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
      incorrectLetters: [],
      hasWon: false,
      hasLost: false,
      numLives: []
    }

    this.getWord      = this.getWord.bind(this)
    this.inputLetter  = this.inputLetter.bind(this)
    this.replaceIt    = this.replaceIt.bind(this)
    this.findIt       = this.findIt.bind(this)
    this.getReference = this.getReference.bind(this)
    this.numLives     = this.numLives.bind(this)
  }

  componentDidMount() {
    this.getWord();
  }

  getWord() {
    const word = randomWords()

    if (!word || word.length < 6) {
      this.getWord()
      console.log(word)
    } else if (word && word.length >= 6){
      console.log('❗️❕ AWORD 💩 AHP ❕️❗', word)
      return this.newWord(word)
    }
  }

  newWord(word) {
    this.setState({
      word,
      inputValue: '',
      letters: word.split(''),
      gameplay: word
        .split('')
        .map(x => '_'),
      incorrectLetters: [],
      hasWon: false,
      hasLost: false,
      guess: 'Start Guession',
      numLives: []
    })  
    
    this.input.focus()
  }

  inputLetter(e) {
    const {word} = this.state
    const {value} = e.target

    this.setState({ 
      inputValue: '', 
      guess: value,
      numLives: 5
    })

    if (word.includes(value)) {
      const indices = this.findIt(value);
      const gameplay = this.replaceIt(value, indices)
      const remaining = gameplay.filter(x => x === '_')

      this.setState({ 
        gameplay,
        hasWon: !remaining.length
      })
    } else if (this.state.incorrectLetters.indexOf(value) === -1) {
      this.setState({
        incorrectLetters: this.state.incorrectLetters.concat([value])
      })
      this.numLives();
      if (this.state.incorrectLetters.length >= 4) {
        alert('you lawst')
        this.setState({
          hasLost: true
        })
      }
      console.log(this.state.incorrectLetters.length)
    }
  }

  numLives() {
    alert('lost a life')
  }

  findIt(letter) {
    return this.state.letters
      .map((x, i) => x === letter ? {letter: x, index: i} : false)
      .filter((x, i) => x.letter)
      .map(x => x.index)
  }

  replaceIt(letter, indices) {
    return this.state.gameplay
      .map((x, i) => indices.toString().includes(i) ? letter : x)
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
          <div className="guess">{this.state.guess}<span className="phase">|</span></div>
          <h2>
            {this.state.gameplay.map((x, i) =>
              <div key={i} className="letter">{x}</div>
            )}
          </h2>
        </div>
        
        <p className="App-intro">
          <input 
            className="input"
            type="text" 
            ref={this.getReference}
            value={this.state.inputValue}
            onChange={this.inputLetter} />
        </p>
        
        {this.state.hasWon 
          ? <button 
            className="restart-btn"
            onClick={this.getWord}>Congrats! Play Agin Bitch!</button>
          : <IncorrectBox letters={this.state.incorrectLetters} />
        }

        {this.state.hasLost
          ? <button
            className="lost-btn"
            onClick={this.getWord}>You lost :( start over?</button>
          : <NumLives />
        }
        <p>{this.state.numLives}</p>

      </div>
    );
  }
}

export default App;