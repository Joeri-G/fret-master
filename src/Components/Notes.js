import React, { Component } from 'react';
import Fretboard from './Fretboard'
import './css/Notes.css';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fretboardComponent: <Fretboard frets={21} strings={6} tuning={["E2", "A2", "D3", "G3", "B3", "E4"]} boardWidth={1400} />
    }
  }

  render() {
    return <div className="notesGame">{this.state.fretboardComponent}</div>;
  }
}
