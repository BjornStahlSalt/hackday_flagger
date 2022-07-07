import React, { useEffect, useState } from 'react';
import './HighScore.css';

const HighScore = () => {
  const [highScores, setHighScores] = useState([]);
  useEffect(() => {
    fetch('https://localhost:7057/db/HighScores')
      .then(response => response.json())
      .then(data => {
        setHighScores(data);
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="Score">
      {highScores.map(item => <p key={item.id}>{item.Name}</p>)}
      {/* <p>
        Player :
        {gameState.playerName}
      </p> */}
      {/* <p>{`Correct/Total : ${gameState.correctAnswers}/${gameState.answersGiven}`}</p> */}
    </div>
  );
};

export default HighScore;
