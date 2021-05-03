import React, { Component } from 'react';
import './css/Fretboard.css'

export default class Fretboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFrets: this.getUpdatedFretList()
    }
  }


  getUpdatedFretList() {
    // update the list of selected frets in the state
    // create an array of X indexes and fill it with another array of Y indexes
    // x => strings
    // y => frets + 1 for open strings
    return new Array(this.props.strings).fill(new Array(this.props.frets + 1).fill(false))
  }

  toggleNote(fretXY) {
    console.log(fretXY);
  }

  noteSwitch(fretXY, k) {
    return <span className="noteSelector" onClick={() => this.toggleNote(fretXY)} key={k}></span>
  }

  generateNeck() {
    const intervals = this.getWidth()
    return intervals.map((interval, i) => <div className="fret" key={i} style={{width: `${interval}px`}}>
      <div className="strings">
        {Array.from({ length: this.props.strings }, (_, k) => this.noteSwitch([i, k], k))}
      </div>
    </div>)
  }

  distanceFromBridge(s, n) {
    return s / (2**(n/12))
  }

  fretWidth(s, n) {
    return this.distanceFromBridge(s, n) - this.distanceFromBridge(s, n + 1);
  }

  getWidth() {
    // https://en.wikipedia.org/wiki/12_equal_temperament
    /*
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
    return null
  }

  render() {
    return <div className="fretboard">{this.generateNut()}{this.generateNeck()}</div>
  }
}
