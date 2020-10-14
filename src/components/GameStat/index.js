import React from 'react';
import './game-stat.css';


function GameStat(props) {
  return (
    <div className="z-depth-2 game-stat">{props.name}: {props.value}</div>
  )
}

export default GameStat;
