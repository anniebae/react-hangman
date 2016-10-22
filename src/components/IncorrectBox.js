import React, { Component } from 'react';

export default class IncorrectBox extends Component {
  render() {

    const letters = this.props.letters ? this.props.letters : []
    return (
      <div>{letters.map((x, i) => 
        <div key={i}>{x}</div>
      )}</div>
    );
  }
}
