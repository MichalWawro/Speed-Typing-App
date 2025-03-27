import React, { useEffect } from 'react'
import './TextDisplay.css';

function TextDisplay({ stage, input, text, display, setDisplay }) {
  useEffect(() => {
    setDisplay(compareStrings(input, text));
  }, [input, text])

  const compareStrings = (input, text) => {
    const inputWords = input.split(' ');
    const textWords = text.split(' ');

    return textWords
      .map((word, index) => compareWords(inputWords[index] || '', word))
      .join(' ');
  };

  const compareWords = (inputWord, targetWord) => {
    let result = '';

    for (let i = 0; i < Math.max(inputWord.length, targetWord.length); i++) {
      const inputChar = inputWord[i] || '';
      const targetChar = targetWord[i] || '';

      if (inputChar === targetChar) { // Correct
        result += `<span class="correct">${targetChar}</span>`;
      } else if (!inputChar && targetChar) { // Skipped
        result += `<span class="skipped">${targetChar}</span>`;
      } else if (inputChar && !targetChar) { // Extra letters
        result += `<span class="extra">${inputChar}</span>`;
      } else { // Incorrect
        result += `<span class="incorrect">${targetChar}</span>`;
      }
    }

    return result;
  };

  return (
    <div>
      <div className={`display-container ${stage === 3 ? 'display-container-summary' : ''}`}>
        <p className={`display-text ${stage === 3 ? 'display-text-summary' : ''}`} dangerouslySetInnerHTML={{ __html: display }} />
      </div>
    </div>
  )
}

export default TextDisplay;