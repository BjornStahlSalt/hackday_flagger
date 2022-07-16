import React, { useEffect, useState } from 'react';
import './HighScore.css';

const HighScore = () => {
  const [highScores, setHighScores] = useState([]);
  useEffect(() => {
    fetch('https://localhost:7057/db/HighScores')
      .then(response => response.json())
      .then(data => {
        setHighScores(data.sort((a, b) => b.correctAnswers - a.correctAnswers).splice(0, 10));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="HighScore">
      {highScores.map((highScore, i) => (
        <p key={highScore.id}>
          {`${i} : ${highScore.name} got ${highScore.correctAnswers} correct answers on ${highScore.playedAt}`}
        </p>
      ))}
    </div>
  );
};

export default HighScore;
