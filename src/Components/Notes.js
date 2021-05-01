import React, { Component } from 'react';
import Fretboard from './Fretboard'
import './css/Notes.css';

export default class Notes extends Component {
  render() {
    return <div className="notesGame">
      <Fretboard fretNum={21} />
    </div>;
  }
}
