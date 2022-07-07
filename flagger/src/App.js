import React, { } from 'react';
import './App.css';
import Question from './Components/Question/Question';
import Score from './Components/Score/Score';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Score />
        <Question />

      </header>
    </div>
  );
};

export default App;
