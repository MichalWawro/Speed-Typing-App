import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import GlobalKeyListener from './components/GlobalKeyListener';
import TextDisplay from './components/TextDisplay';

function App() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('bread monkey table tree family');
  const [textTable, setTextTable] = useState(['bread', 'monkey', 'table', 'tree', 'family']);

  const [time, setTime] = useState(10);
  const [justReset, setJustReset] = useState(true);
  const [keyListener, setKeyListener] = useState(true);
  const keyListenerRef = useRef(keyListener);

  useEffect(() => {
    fetchText();
  }, [])

  //KeyListener Ref
  useEffect(() => {
    keyListenerRef.current = keyListener;
  }, [keyListener])

  //Timer
  useEffect(() => {
    if (!justReset) {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime < 1) {
            setKeyListener(false);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [justReset, time]);

  //HandleKeyPress
  const handleKeyPress = (key) => {
    //Reset Button
    if (key === 'Escape') {
      reset();
    };

    //Return if keyListener is off
    if (!keyListenerRef.current) return;

    //Timer start
    if (input === '' && key.length === 1 && key !== ' ') {
      setJustReset(false);
    };

    //Input changers
    if (key.length === 1) {
      setInput((prevInput) => prevInput + key);
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    };
  };

  //Game reset
  const reset = () => {
    setInput('');
    setTime(10)
    setKeyListener(true);
    setJustReset(true);
  };

  //Fetch text from server
  const fetchText = () => {
    fetch('http://localhost:8080/api/get-random-text')
      .then(response => response.text())
      .then(data => setText(data))
      .catch(error => console.error("Error fetching text: ", error));
  };

  return (
    <div className="App">
      <GlobalKeyListener onKeyPress={handleKeyPress} />
      <TextDisplay text={text} input={input} time={time} />
    </div>
  );
}

export default App;