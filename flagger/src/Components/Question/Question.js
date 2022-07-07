import React, { useState, useEffect } from 'react';
import './Question.css';

const Question = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [countryName, setCountryName] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch("https://localhost:7094/api/Flags")
      .then(response => response.json())
      .then(data => {
        setCountryName(data.name);
        setImgUrl(data.url);
      })
      .catch(err => console.log(err))
  }, []);

  const submitAnswer = () => {
    console.log(countryName === answer);
  };

  return (
    <form className="Question" onSubmit={submitAnswer}>
      <img className="Question__Img" src={imgUrl} alt="flag" />
      <label className="Question__Label">Name the country</label>
      <input className="Question__Input" value={answer} onChange={e => setAnswer(e.target.value)}></input>
    </form>
  );
};

export default Question;
