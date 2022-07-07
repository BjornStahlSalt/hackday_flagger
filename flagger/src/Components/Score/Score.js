import React, { } from 'react';
import './Score.css';

const Score = ({ gameState }) => {
  console.log();
  return (
    <div className="Score">
      <p>
        Player :
        {gameState.playerName}
      </p>
      <p>{`Correct/Total : ${gameState.correctAnswers}/${gameState.answersGiven}`}</p>
    </div>
  );
};

export default Score;
