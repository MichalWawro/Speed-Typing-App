import React, { useEffect, useState } from 'react';
import './App.css';

import GlobalKeyListener from './components/GlobalKeyListener';
import TextDisplay from './components/TextDisplay';
import Options from './components/Options'
import Counter from './components/Counter';
import SummaryScreen from './components/SummaryScreen';
import Footer from './components/Footer'

function App() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('bread monkey table tree family');
  const [textTable, setTextTable] = useState(['bread', 'monkey', 'table', 'tree', 'family']);
  const [display, setDisplay] = useState('');

  const [stage, setStage] = useState(1);
  const [justReset, setJustReset] = useState(true);
  const [keyListener, setKeyListener] = useState(true);
  //Delete both justReset and keyListener

  const [mode, setMode] = useState('time')
  const [time, setTime] = useState(30);
  const [wordCount, setWordCount] = useState(120);

  useEffect(() => {
    fetchText();
  }, [])

  //Fetch text from server
  const fetchText = () => {
    fetch('http://localhost:8080/api/get-random-text')
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.error("Error fetching text: ", error));
  };

  //HandleInput 
  const handleInput = (key) => {
    if (input === '' && key !== ' ') { //Timer start
      setJustReset(false);
      //setStage(2);
    };

    if (key === 'Backspace') { //Input changers
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      setInput((prevInput) => prevInput + key);
    };
  };

  //Game reset
  const reset = () => {
    setInput('');
    setTime(30)
    setKeyListener(true);
    setJustReset(true);
    //setStage(1)
  };

  return (
    <div className="App">
      <GlobalKeyListener onInput={handleInput} reset={reset} stage={stage} keyListener={keyListener} />

      <Options mode={mode} setMode={setMode} setTime={setTime} setWordCount={setWordCount} reset={reset} />
      <Counter stage={stage} setStage={setStage} time={time} setTime={setTime} wordCount={wordCount} setWordCount={setWordCount} justReset={justReset} setKeyListener={setKeyListener} />
      <TextDisplay input={input} text={text} display={display} setDisplay={setDisplay} />
      <SummaryScreen />
      <Footer />
    </div>
  );
}

export default App;