import React, { Component } from 'react';
import Notes from './Notes';
import './css/StartScreen.css';

export default class StartScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGame: null,
      gameList: [{
        name: "Notes",
        game: <Notes/>
      }]
    }
  }

  gameList() {
    return <div className="gameList">
      {this.state.gameList.map((obj, i) => <button key={i} onClick={() => this.gameSelect(i)}>
          {obj.name}
        </button>)}
    </div>;
  }

  gameSelect(gameIndex) {
    const game = this.state.gameList[gameIndex].game
    this.setState({currentGame: game})
  }

  backButton() {
    return <button className="backButton" onClick={() =>
      this.setState({
        currentGame: null
      })
    }>
      Back
    </button>
  }

  render() {
    return <div className="StartScreen">
      {(this.state.currentGame == null) ? this.gameList() : <React.Fragment>
        {this.backButton()} {this.state.currentGame}
      </React.Fragment>}
    </div>;
  }
}
