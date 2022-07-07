import React, { useState, useEffect } from 'react';
import './Question.css';

const Question = ({ gameState, flagUrl, flagName }) => {
  const [answer, setAnswer] = useState('');

  useEffect(() => {

  }, []);

  const submitAnswer = () => {
    console.log(flagName === answer);
  };

  return (
    <form className="Question" onSubmit={submitAnswer}>
      <h1>{`Flag ${gameState.answersGiven} out of ${gameState.totalQuestions}`}</h1>
      <img className="Question__Img" src={flagUrl} alt="flag" />
      <h3 className="Question__Label">Name the country</h3>
      <input className="Question__Input" type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
    </form>
  );
};

export default Question;
