import React, { useEffect, useState } from 'react';
import './App.css';

import GlobalKeyListener from './components/GlobalKeyListener';
import TextDisplay from './components/TextDisplay';
import Options from './components/Options'
import Counter from './components/Counter';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  const [input, setInput] = useState('');
  const [targetWords, setTargetWords] = useState(['bread', 'monkey', 'table', 'tree', 'family']);
  const [stage, setStage] = useState(1);
  const [mode, setMode] = useState('time')
  
  const [wordLimit, setWordLimit] = useState(120);
  const [initialTime, setInitialTime] = useState(30);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    fetchWordsArray();
  }, [])

  const fetchWordsArray = () => {
    fetch('http://localhost:8080/api/get-random-array')
      .then(response => response.json())
      .then(data => setTargetWords(data))
      .catch(error => console.error("Error fetching data: ", error));
  }

  const handleKeyInput = (key) => {
    setInput((prevInput) => {
      if (prevInput === '' && key !== ' ') {
        setStage(2);
      }

      if (key === 'Backspace') {
        return prevInput.slice(0, -1);
      } else if (key === ' ' && (prevInput.endsWith(' ') || prevInput === '')) {
        return prevInput;
      } else {
        return prevInput + key;
      }
    });
  };

  const reset = () => {
    setInput('');
    setRemainingTime(initialTime);
    setStage(1);
  };

  return (
    <div className="App">
      <GlobalKeyListener onInput={handleKeyInput} stage={stage} reset={reset} testSetRemainingTime={setRemainingTime} />

      <Options stage={stage} mode={mode} setMode={setMode} setRemainingTime={setRemainingTime} setInitialTime={setInitialTime} setWordLimit={setWordLimit} reset={reset} />
      <Counter stage={stage} setStage={setStage} remainingTime={remainingTime} setRemainingTime={setRemainingTime} wordLimit={wordLimit} setWordLimit={setWordLimit} />
      <TextDisplay stage={stage} userInput={input} targetWords={targetWords} />
      <Stats stage={stage} input={input} targetWords={targetWords} mode={mode} time={initialTime} wordLimit={wordLimit} />
      <Footer stage={stage} />
    </div>
  );
}

export default App;