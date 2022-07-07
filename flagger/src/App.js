import React, { useState } from 'react';
import Question from './Components/Question/Question';
import Score from './Components/Score/Score';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState({
    hasStarted: false,
    playerName: '',
    answersGiven: 0,
    correctAnswers: 0,
    totalQuestions: 10,
  });

  const [flagName, setFlagName] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  const getNewFlag = () => {
    fetch('https://localhost:7094/api/Flags')
      .then(response => response.json())
      .then(data => {
        setFlagName(data.name);
        setFlagUrl(data.url);
      })
      .catch(err => console.log(err));
  };

  const startGame = () => {
    const newGameState = gameState;
    newGameState.hasStarted = true;
    setGameState(newGameState);
    getNewFlag();
  };

  if (gameState.hasStarted) {
    return (
      <div className="App">
        <Score gameState={gameState} />
        <Question gameState={gameState} flagUrl={flagUrl} flagName={flagName} />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="App__Start" type="submit" onClick={startGame}>Start!</button>
      </header>
    </div>
  );
};

export default App;
