import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap'
import Card from '../Card';
import GameTimer from '../GameTimer';
import GameStat from '../GameStat';
import GameOverModal from '../GameOverModal';
import "./game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      turn: 0,
      moves: 0,
      matches: 0,
      block: false,
      gameOver: false,
      reset: false,
    };

    this.snapshot = {};
    this.time = 0;
    this.timeout = 1500;
    this.gameID = 1;
    this.initialState = this.state;
    this.callbacks = [];
    this.picked = [];
    this.cardArray = [];
    this.createNewGame = this.createNewGame.bind(this);
    this.checkBlockingState = this.checkBlockingState.bind(this);
    this.createCardTable = this.createCardTable.bind(this);
    this.compareCards = this.compareCards.bind(this);
    this.finishCallbacks = this.finishCallbacks.bind(this);
    this.cardsDoMatch = this.cardsDoMatch.bind(this);
    this.resetPicked = this.resetPicked.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.setTime = this.setTime.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.createCardTable();
  }


  createNewGame() {
    this.gameID += 1;
    this.callbacks = [];
    this.picked = [];
    this.cardArray = [];
    this.createCardTable();
    this.setState(this.initialState);
    this.setState({reset: true});
  }


  checkBlockingState() {
    return this.state.block;
  }


  createCardTable() {
    let values = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    let gameID = this.gameID;
    let cardArray = [];

    for (let i=0; i<12; i++) {
      const random = Math.floor(Math.random() * values.length);
      let value = values[random];
      let key = (i) + (gameID * 12);
      let card = (
        <Card
          key={key}
          id={i}
          reveal={false}
          matched={false}
          blockState={this.checkBlockingState}
          selectCard={this.selectCard}
          value={value}/>
      )
      cardArray.push(card);
      values.splice(random , 1);
    }
    this.cardArray =  cardArray;
  }


  compareCards() {
    if (this.picked[0].value === this.picked[1].value) {
      this.picked[0].matched = true;
      this.picked[1].matched = true;
      return true;
    }
    return false
  }


  finishCallbacks() {
    for (let i=0; i<2; i++) {
     this.callbacks[i](this.picked[i]);
    }
  }


  finishTurn() {
    this.picked = [];
    this.callbacks = [];
    this.setState({block: false});
  }


  cardsDoMatch() {
    this.finishCallbacks();
    this.setState(prevState => {
      return {
        moves: prevState.moves + 1,
        matches: prevState.matches + 1
      }
    });
    setTimeout(() => {
      this.finishTurn();
      this.isGameOver()
    },this.timeout/2);
  }


  resetPicked() {
    setTimeout(() => {
      this.finishCallbacks();
      this.setState(prevState => {
        return {moves: prevState.moves + 1}
      });
      this.finishTurn();
    }, this.timeout);
  }


  selectCard(e, cardState, cb) {
    this.picked.push(cardState);
    this.callbacks.push(cb);

    if (this.picked.length === 2) {
      this.setState({block: true});
      if (this.compareCards() === true) {
        this.cardsDoMatch();
      } else {
        this.resetPicked();
      }
    }
  }


  getStatsSnapshot() {
    let snapshot = {
      moves: this.state.moves,
      matches: this.state.matches,
      time: this.time,
      gameID: this.gameID,
    }
    return snapshot;
  }


  setTime(time) {
    this.time = time;
  }


  isGameOver() {
    if (this.state.matches === (this.cardArray.length/2)) {
      this.setState({
        gameOver: true,
      });
    }
  }


  render() {
    let state = this.state;
    let cardArray = this.cardArray;

    if(this.state.reset===true) {
      this.setState({reset: false});
    }

    return (
      <div className="game">
        <Container>
          <GameOverModal
            display={this.state.gameOver}
            moves={this.state.moves}
            time={this.time}
            newGame={this.createNewGame}/>
          <div className="z-depth-2 wrapper">
            <Row className="game-header">
                <Col md={8}>
                  <h1 className="header-title">Memory Game</h1>
                </Col>
                <Col md={4}>
                  <GameStat name="Matches" value={state.matches} />
                  <GameStat name="Moves" value={state.moves} />
                  {/*<GameTimer setTime={this.setTime} reset={this.state.reset} stop={this.state.gameOver}/>*/}
                </Col>
            </Row>
          </div>
          <Row>
            <div className="game-table">
              {cardArray}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Game;
