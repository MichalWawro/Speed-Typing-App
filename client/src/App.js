import React, { useState } from 'react';
import './App.css';

import GlobalKeyListener from './components/GlobalKeyListener';
import TextDisplay from './components/TextDisplay';

function App() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('bread monkey table tree family');
  const [textTable, setTextTable] = useState(['bread', 'monkey', 'table', 'tree', 'family']);

  const handleKeyPress = (key) => {
    if (key === ' ') {
      setInput((prevInput) => prevInput + ' ');
      console.log('Space pressed');
    } else if (key.length === 1) {
      setInput((prevInput) => prevInput + key);
    } else if (key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  const reset = () => {
    setInput('');
  };

  return (
    <div className="App">
      <GlobalKeyListener onKeyPress={handleKeyPress} />

      <button className="ResetButton" onClick={reset}>Reset</button>
      <TextDisplay text={text} input={input} />
      <h1>{input}</h1>
    </div>
  );
}

export default App;
