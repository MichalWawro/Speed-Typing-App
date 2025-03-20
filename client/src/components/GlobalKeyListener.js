import { useEffect } from 'react';

function GlobalKeyListener({ onInput, reset, stage, keyListener }) {
  const handleKeyPress = (event) => {
    const { key } = event;
    
    if (key === 'Escape') { //Reset Button
      reset();
    };

    if (!keyListener) return;
    //stage 1 3

    if (key.length === 1 || key === 'Backspace') {
      onInput(key);
    };
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);;
  }, [keyListener]);

  return null;
};

export default GlobalKeyListener;