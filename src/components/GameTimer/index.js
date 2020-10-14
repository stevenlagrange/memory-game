import React from "react";
import './game-timer.css';

class GameTimer extends React.Component {

  constructor(props){
    super(props)

    this.state = {timer: 0}
    this.tick = this.tick.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
       () => this.tick(),
       1000
   );
  }

   componentWillUnmount() {
      clearInterval(this.timerID);
   }

   reset() {
     this.timerID = setInterval(
        () => this.tick(),
        1000
    );
    this.setState({timer: 0});
   }

   stop(cb) {
     clearInterval(this.timerID);
     cb(this.state.timer);
   }

   tick() {
     this.setState(prevState => {
       return {timer: prevState.timer + 1}
     });
   }

   render() {
     if(this.props.stop) {
       this.stop(this.props.setTime);
     }

     if(this.props.reset) {
       this.reset();
     }

     let timer = this.state.timer;
     return (
       <p className="timer">Timer: {timer}s</p>
     )
   }
}

export default GameTimer;
