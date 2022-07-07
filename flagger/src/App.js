import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [imgUrl, setImgUrl] = useState('');
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    fetch("https://localhost:7094/api/Flags")
      .then(response => response.json())
      .then(data => {
        setCountryName(data.name);
        setImgUrl(data.url);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={imgUrl} className="App-flag" alt="flag" />
        <p>Name of country : {countryName}</p>
      </header>
    </div>
  );
}

export default App;
