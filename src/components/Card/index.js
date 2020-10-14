import React from 'react';
import "./card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reveal: this.props.reveal,
      matched: this.props.matched,
      isSelected: false,
      value: this.props.value,
      id: this.props.id
    }

    this.handleClick = this.handleClick.bind(this);
    this.flipCard = this.flipCard.bind(this);
    this.update = this.update.bind(this);
  }


  handleClick(e, props, callback) {
      let blockState = props.blockState();
      if(blockState !== true) {
        this.flipCard(e, props, callback);
      }
  }


  flipCard(e, props, callback) {
      this.setState(prevState => {
       return {reveal: !prevState.reveal}
      })

      let currentState = this.state;
      callback(e, currentState, this.update);
  }


  update(updatedState) {
    this.setState(updatedState);
  }


  render() {
    let renderCard = () => {
      if(this.state.matched) {
        return (
          <div className="z-depth-2 card matched-card">
            <h3 className="card-value">{this.props.value}</h3>
          </div>
        )
      } else if(this.state.reveal) {
        return (
          <div className="z-depth-2 card show-card">
            <h3 className="card-value">{this.props.value}</h3>
          </div>
        )
      } else {
        return (
          <div className="z-depth-2 card"
            onClick={(e) => this.handleClick(e, this.props, this.props.selectCard)}>
            <h3 className="card-value">M</h3>
          </div>
        )
      }
    }

    return (
      <div className="card-wrapper">
        {renderCard()}
      </div>
    );
  }
}

export default Card;
