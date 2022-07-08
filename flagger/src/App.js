import React, { useState, useEffect } from 'react';
import Question from './Components/Question/Question';
import Score from './Components/Score/Score';
import HighScore from './Components/HighScore/HighScore';
import SetPlayerName from './Components/SetPlayerName/SetPlayerName';
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
    const newGameState = {
      hasStarted: true,
      playerName: gameState.playerName,
      answersGiven: gameState.answersGiven,
      correctAnswers: gameState.correctAnswers,
      totalQuestions: 10,
    };
    setGameState(newGameState);
    getNewFlag();
  };

  useEffect(() => {
    console.log('Effect');
  }, []);

  if (gameState.hasStarted) {
    return (
      <div className="App">
        <div className="App__Body">
          <Score gameState={gameState} />
          <Question
            gameState={gameState}
            setGameState={setGameState}
            getNewFlag={getNewFlag}
            flagUrl={flagUrl}
            flagName={flagName} />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App__header">
        <h3 className="App__h3">Flag Quiz</h3>
      </header>
      <div className="App__Body">
        <SetPlayerName gameState={gameState} setGameState={setGameState} />
        <button className={gameState.playerName === '' ? 'Hide' : 'App__Start'} type="submit" onClick={startGame}>Start!</button>
        <HighScore />
      </div>
    </div>
  );
};

export default App;
