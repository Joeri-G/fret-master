import React, { Component } from 'react'
import Fretboard from './Fretboard'
import './css/Notes.css'

export default class Notes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // setting fretboardInstance as null because
      // I want to pass some state vars to it
      fretboardInstance: null,
      fretboardState: [],
      activeNote: null,
      tuning: ["E2", "A2", "D3", "G3", "B3", "E4"]
    }

    this.state.fretboardInstance = <Fretboard
                                      frets={21}
                                      strings={6}
                                      tuning={this.state.tuning}
                                      boardWidth={1400}
                                      nutWidth={64}
                                      onFretboardUpdate={
                                        (s) => this.updateFretboardState(s)
                                      }
                                    />
  }

  componentDidMount() {
    this.startRound()
  }

  parseNote(n) {
    const nrx = /[A-g][b#]?[0-9]/
    const matchArr = nrx.exec(n)
    if (matchArr == null) { return null }
    const note = (n.length === 2) ? matchArr[0].substr(0, 1) : matchArr[0].substr(0, 2)
    const octave = (n.length === 2) ? Number(matchArr[0].substr(1, 1)) : Number(matchArr[0].substr(2, 1))
    // match against sharps
    // flats will come later, maybe
    // FIXME: sharps are not regocnized
    const noteID = ["C", "C#",  "D", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"].indexOf(note) + octave * 12
    return {
      note: note,
      noteID: noteID,
      octave: octave
    }
  }

  startRound() {
    // iterate over tunings and parse them
    let notes = []
    for (const n of this.state.tuning) {
      notes.push(this.parseNote(n))
    }
    // sort notes
    for (var i = 0; i < notes.length; i++) {
      for(let j = i - 1; j > -1; j--){
        if (notes[j+1].octave < notes[j].octave || (
            notes[j+1].octave === notes[j].octave &&
            notes[j+1].noteID < notes[j].noteID)) {
              [notes[j + 1],notes[j]] = [notes[j],notes[j + 1]]
        }
      }
    }
    const highestNote = notes[notes.length - 1]
    const lowestNote = notes[0]

    const newNoteID = Math.floor(Math.random() * (highestNote.noteID - lowestNote.noteID + 1) ) + lowestNote.noteID
    const newNote = {
      note: ["C", "D", "E", "F", "G", "A", "B", "C"][newNoteID % 12],
      noteID: newNoteID,
      octave: Math.floor(newNoteID / 12)
    }
    this.setState({activeNote: newNote})
  }

  updateFretboardState(newState) {
    this.setState({fretboardState: newState})
  }

  getActiveFrets() {
    const active = []
    this.state.fretboardState.forEach((string, x) => {
      string.forEach((fret, y) => {
        if (fret) { active.push([x, y]) }
      })
    })
    return active
  }

  fretToNote(fret, tuning) {
  }

  checkNotes() {
    // const activeFrets = this.getActiveFrets()

    this.startRound()
  }

  drawActiveNote() {
    let note = "Loading..."
    if (this.props.ignoreOctave && this.state.activeNote) {
      note = this.state.activeNote.note
    }
    if (this.state.activeNote) {
      note = `${this.state.activeNote.note}${this.state.activeNote.octave}`
    }
    return <div className="activeNote"><span>{note}</span></div>
  }

  render() {
    return <div className="notesGame">
      {this.drawActiveNote()}
      {this.state.fretboardInstance}
      <div className="checkFretboard">
        <button onClick={() => this.checkNotes()}>Check</button>
      </div>
    </div>
  }
}
