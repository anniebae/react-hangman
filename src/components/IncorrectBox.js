import React, { Component } from 'react';

export default class IncorrectBox extends Component {
  render() {    
    return (
      <div>{this.props.letters.map((x, i) => 
        <div key={i}>{x}</div>
      )}</div>
    );
  }
}
