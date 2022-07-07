import React, { useState } from 'react';
import './Question.css';

const Question = ({
  gameState,
  setGameState,
  getNewFlag,
  flagUrl,
  flagName,
}) => {
  const [answer, setAnswer] = useState('');

  const submitAnswer = () => {
    const newGameState = {
      hasStarted: true,
      playerName: gameState.playerName,
      answersGiven: gameState.answersGiven,
      correctAnswers: gameState.correctAnswers,
      totalQuestions: 10,
    };

    newGameState.correctAnswers += flagName === answer ? 1 : 0;
    newGameState.answersGiven += 1;

    if (newGameState.answersGiven === gameState.totalQuestions) {
      newGameState.hasStarted = false;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: gameState.playerName,
          CorrectAnswers: newGameState.correctAnswers,
        }),
      };
      fetch('https://localhost:7057/db/HighScores', requestOptions)
        .then(response => response.json());
      // .then(data => this.setState({ postId: data.id }));
    }

    setGameState(newGameState);
    getNewFlag();
    setAnswer('');
  };

  const inputKeyPressed = e => {
    if (e.code === 'Enter') {
      e.preventDefault();
      submitAnswer();
    }
  };

  return (
    <div className="Question">
      <h1>{`Flag ${gameState.answersGiven} out of ${gameState.totalQuestions}`}</h1>
      <img className="Question__Img" src={flagUrl} alt="flag" />
      <h3 className="Question__Label">Name the country</h3>
      <input className="Question__Input" type="text" value={answer} onKeyDown={e => inputKeyPressed(e)} onChange={e => setAnswer(e.target.value)} />
      <button type="submit" onClick={submitAnswer}>Answer</button>
    </div>
  );
};

export default Question;
