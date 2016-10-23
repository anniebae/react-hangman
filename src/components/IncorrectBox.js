import React, { Component } from 'react';

export default class IncorrectBox extends Component {
  render() {    
    return (
      <div>{this.props.letters.map((x, i) => 
        <div className="incorrect-letter" key={i}>{x}</div>
      )}</div>
    );
  }
}
