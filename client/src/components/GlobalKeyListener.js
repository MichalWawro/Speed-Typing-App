import { useEffect } from 'react';

function GlobalKeyListener({ onInput, reset, stage, testSetRemainingTime }) {
  const handleKeyPress = (event) => {
    const { key } = event;

    if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement.tagName === 'BUTTON'
    ) {
      document.activeElement.blur();
    }

    if (key === 'Escape') reset();
    if (key === 'F2') testSetRemainingTime(1);
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
      }, 500);
    }

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [stage]);

  return null;
};

export default GlobalKeyListener;