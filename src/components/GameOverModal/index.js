import React from "react";
import Button from "react-bootstrap/Button";
import './game-over-modal.css';

class GameOverModal extends React.Component {
  render() {
    let display = this.props.display;
    return (
      <div>
        { display && <Modal time={this.props.time} moves={this.props.moves} close={this.props.newGame}/> }
      </div>
    )
  }
}

function Modal(props) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={()=>{props.close()}}>&times;</span>
        </div>
        <div className="modal-body">
          <p>Congratulations!</p>
          <p>You did well.</p>
          <p>Moves: {props.moves}</p>
          <Button onClick={()=>{props.close()}}>New Game</Button>
        </div>
        <div className="modal-footer">
        </div>
      </div>
    </div>
  )
}

export default GameOverModal;
