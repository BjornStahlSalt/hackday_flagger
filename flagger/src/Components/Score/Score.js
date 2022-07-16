import React, { } from 'react';
import './Score.css';

const Score = ({ gameState }) => {
  console.log();
  return (
    <div className="Score">
      <p>{`Player : ${gameState.playerName}`}</p>
      <p>{`Correct : ${gameState.correctAnswers}`}</p>
    </div>
  );
};

export default Score;
