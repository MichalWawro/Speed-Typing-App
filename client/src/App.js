import React, { useEffect, useState } from 'react';
import './App.css';

import GlobalKeyListener from './components/GlobalKeyListener';
import TextDisplay from './components/TextDisplay';
import Options from './components/Options'
import Counter from './components/Counter';
import SummaryScreen from './components/SummaryScreen';
import Footer from './components/Footer';

function App() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('bread monkey table tree family');
  const [words, setWords] = useState(['bread', 'monkey', 'table', 'tree', 'family']);

  const [stage, setStage] = useState(1);

  const [mode, setMode] = useState('time')
  const [time, setTime] = useState(30);
  const [wordCount, setWordCount] = useState(120);

  useEffect(() => {
    fetchText();
    fetchArray(); //In testing
  }, [])

  //Fetch text from server
  const fetchText = () => {
    fetch('http://localhost:8080/api/get-random-text')
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.error("Error fetching text: ", error));
  };

  const fetchArray = () => {
    fetch('http://localhost:8080/api/get-random-array')
      .then(response => response.json())
      .then(data => setWords(data))
      .catch(error => console.error("Error fetching text: ", error));
  }

  //HandleInput 
  const handleInput = (key) => {
    setInput((prevInput) => {
      if (prevInput === '' && key !== ' ') { // Timer start
        setStage(2);
      }

      if (key === 'Backspace') { // Handle backspace
        return prevInput.slice(0, -1);
      } else if (key === ' ' && (prevInput.endsWith(' ') || prevInput === '')) { // Prevent double spaces
        return prevInput;
      } else {
        return prevInput + key;
      }
    });
  };

  //Game reset
  const reset = () => {
    setInput('');
    setTime(30);
    setStage(1);
  };

  return (
    <div className="App">
      <GlobalKeyListener onInput={handleInput} stage={stage} reset={reset} testSetTime={setTime} />

      <Options stage={stage} mode={mode} setMode={setMode} setTime={setTime} setWordCount={setWordCount} reset={reset} />
      <Counter stage={stage} setStage={setStage} time={time} setTime={setTime} wordCount={wordCount} setWordCount={setWordCount} />
      <TextDisplay stage={stage} input={input} text={text} words={words} />
      <SummaryScreen stage={stage} input={input} words={words} mode={mode} />
      <Footer stage={stage} />
    </div>
  );
}

export default App;