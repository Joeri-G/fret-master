import React, { Component } from 'react';
import Fretboard from './Fretboard'
import './css/Notes.css';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fretboardInstance: <Fretboard
                            frets={21}
                            strings={6}
                            tuning={["E2", "A2", "D3", "G3", "B3", "E4"]}
                            boardWidth={1400}
                            nutWidth={64}
                            onFretboardUpdate={(s) => this.updateFretboardState(s)}
                          />,
      fretboardState: []
    }
  }

  updateFretboardState(newState) {
    this.setState({fretboardState: newState})
  }

  getActiveFrets() {
    const active = []
    this.state.fretboardState.forEach((string, x) => {
      string.forEach((fret, y) => {
        if (fret) { active.push([x, y]) }
      });
    });
    return active
  }

  checkNotes() {
    const activeFrets = this.getActiveFrets()
    console.log(activeFrets);
  }

  render() {
    return <div className="notesGame">
      {this.state.fretboardInstance}
      <button onClick={() => this.checkNotes()}>Check</button>
    </div>;
  }
}
