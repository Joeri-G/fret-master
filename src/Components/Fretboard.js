import React, { Component } from 'react';
import './css/Fretboard.css'

export default class Fretboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFrets: this.makeUpdatedFretList(),
      frets: this.props.frets,
      strings: this.props.strings,
      tuning: this.props.tuning
    }
  }

  /*
    is a derived state absolutely neccesarry?
    Well, if the neck were to change the grid of fret selections would not
    update which could cause some annoying bugs.
    An alternative would be to contruct a new component everytime the
    stringcount, fretcount or tuing were to change, but that would be annoying.
  */
  static getDerivedStateFromProps(props, state) {
    const comps = ["frets", "strings", "tuning"]
    for (const c of comps) {
      if (state[c] !== props[c]) {
        return {
          /*
            since this is a static method we cannot reference "this"
            and call this.makeUpdatedFretList, so I copypasted the function
          */
          selectedFrets: new Array(props.strings).fill(new Array(props.frets + 1).fill(false)),
          frets: props.frets,
          strings: props.strings,
          tuning: props.tuning
        }
      }
    }
    return null
  }

  makeArray(n, d=false) {
    return Array(n).fill(d);
  }

  makeUpdatedFretList() {
    /*
      update the list of selected frets in the state
      create an array of X indexes and fill it with another array of Y indexes
      x => strings
      y => frets + 1 for open strings
    */
    return Array.from({length: this.props.strings}, e => this.makeArray(this.props.frets + 1))
  }

  toggleNote(string, fret) {
    let updateSelectedFrets = this.state.selectedFrets
    updateSelectedFrets[string][fret] = !updateSelectedFrets[string][fret]
    this.setState({selectedFrets: updateSelectedFrets})
    // fire onFretboardUpdate event
    this.props.onFretboardUpdate(updateSelectedFrets)
  }

  noteSwitch(string, fret, k) {
    return <span className={(this.state.selectedFrets[string][fret] === true) ? "noteSelector selected" : "noteSelector"} onClick={() => this.toggleNote(string, fret)} key={k}></span>
  }

  generateNeck() {
    const intervals = this.calcWidth()
    return <React.Fragment>
      {this.generateNut()}
      {intervals.map((interval, i) => <div className="fret" key={i} style={{width: `${interval}px`}}>
        {this.generateStringButtons(i+1)}
      </div>)}
    </React.Fragment>
  }

  generateStringButtons(fret) {
    return <div className="strings">
      {Array.from({ length: this.props.strings }, (_, k) => this.noteSwitch(k, fret, k))}
    </div>
  }

  distanceFromBridge(s, n) {
    return s / (2**(n/12))
  }

  fretWidth(s, n) {
    return this.distanceFromBridge(s, n) - this.distanceFromBridge(s, n + 1);
  }

  calcWidth() {
    /*
      https://en.wikipedia.org/wiki/12_equal_temperament

      D(s, n) = s / ((2**(1/12))**n)  // distance from nut
      W(s, n) = D(s, n) - D(s, n+1)   // width of frets

      when only the width of the fretboard is known the scale length can be calculated as follows
      where s is the total length and x is the distance from the nut to the fret
      s = x / (2**(-n/12)-1) * -1
    */

    const scaleLength = this.props.scaleLength ||  this.props.boardWidth / (2**(-(this.props.frets)/12) -1) * -1
    let widths = []
    for (var i = 0; i < this.props.frets; i++) {
      widths.push(Math.floor(this.fretWidth(scaleLength, i)));
    }
    return widths;
  }

  generateNut() {
    // TODO: ADD AN OPTION TO PLAY OPEN STRINGS
    return <div className="nut" style={{width: `${this.props.nutWidth}px`}}>
      {this.generateStringButtons(0)}
    </div>
  }

  render() {
    return <div className="fretboard">{this.generateNeck()}</div>
  }
}
