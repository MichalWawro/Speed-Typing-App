import { useEffect } from 'react';

function GlobalKeyListener({ onInput, reset, stage, testSetTime }) {
  const handleKeyPress = (event) => {
    const { key } = event;

    if (key === 'Escape') { //Reset Button
      reset();
    };

    if (key === 'F2') {
      testSetTime(1);
    }

    if (stage === 3) return;

    if (key.length === 1 || key === 'Backspace') {
      onInput(key);
    };
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    if (stage === 1) {
      window.removeEventListener("keydown", handleKeyPress);
      setTimeout(() => {
        window.addEventListener("keydown", handleKeyPress);
      }, 750);
    }

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [stage]);

  return null;
};

export default GlobalKeyListener;