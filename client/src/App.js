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

  const [wordLimit, setWordLimit] = useState(60);
  const [initialTime, setInitialTime] = useState(30);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    if (stage === 1) {
      mode === 'time' ? fetchWordsArray(null, true) : fetchWordsArray(wordLimit, true);
    }
  }, [mode, stage, wordLimit, initialTime])

  useEffect(() => {
    if (mode === 'time') {
      setRemainingTime(initialTime);
    } else {
      setRemainingTime(0);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'wordLimit' && input.split(' ').length === wordLimit && input.split(' ')[wordLimit - 1] === targetWords[wordLimit - 1]) {
      setStage(3);
    }
  }, [input]);

  const fetchWordsArray = (wordLimit, clearPrevData) => {
    fetch(`http://localhost:8080/api/get-random-array${wordLimit === null ? "" : `?count=${wordLimit}`}`)
      .then(response => response.json())
      .then(data => {
        if (clearPrevData) {
          setTargetWords(data);
        } else {
          setTargetWords(prev => [...prev, ...data]);
        }
      })
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
    if (mode === 'time') {
      setRemainingTime(initialTime);
    } else {
      setRemainingTime(0);
    }
    setStage(1);
  };

  return (
    <div className="App">
      <GlobalKeyListener onInput={handleKeyInput} stage={stage} reset={reset} testSetRemainingTime={setRemainingTime} />

      <Options stage={stage} mode={mode} setMode={setMode} setRemainingTime={setRemainingTime} setInitialTime={setInitialTime} setWordLimit={setWordLimit} reset={reset} />
      <Counter stage={stage} setStage={setStage} remainingTime={remainingTime} setRemainingTime={setRemainingTime} wordLimit={wordLimit} setWordLimit={setWordLimit} mode={mode} />
      <TextDisplay stage={stage} userInput={input} targetWords={targetWords} mode={mode} fetchRandomWords={fetchWordsArray} />
      <Stats stage={stage} input={input} targetWords={targetWords} mode={mode} remainingTime={remainingTime} initialTime={initialTime} wordLimit={wordLimit} />
      <Footer stage={stage} />
    </div>
  );
}

export default App;