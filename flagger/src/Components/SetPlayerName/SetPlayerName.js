import React, { useState } from 'react';
import './SetPlayerName.css';

const SetPlayerName = ({ gameState, setGameState }) => {
  const [inputValue, setInputValue] = useState('');

  const submitName = () => {
    const newGameState = {
      hasStarted: gameState.hasStarted,
      playerName: inputValue,
      answersGiven: gameState.answersGiven,
      correctAnswers: gameState.correctAnswers,
      totalQuestions: gameState.totalQuestions,
    };
    setGameState(newGameState);
  };

  const inputKeyPressed = e => {
    if (e.code === 'Enter') {
      e.preventDefault();
      submitName();
    }
  };

  return (
    <div className="PlayerName">
      <h2>{`Player Name : ${gameState.playerName}`}</h2>
      <input className="PlayerName__Input" type="text" value={inputValue} onKeyDown={e => inputKeyPressed(e)} onChange={e => setInputValue(e.target.value)} />
      <button className="PlayerName__Button" type="submit" onClick={submitName}>Confirm</button>
    </div>
  );
};

export default SetPlayerName;
