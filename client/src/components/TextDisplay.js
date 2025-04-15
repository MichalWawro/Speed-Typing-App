import React, { useState, useEffect } from 'react';
import './TextDisplay.css';

function TextDisplay({ stage, input, words }) { //-text
  const [display, setDisplay] = useState('');

  const [topPosition, setTopPosition] = useState(0);
  const [lineOffset, setLineOffset] = useState(0);
  const [lastCursorY, setLastCursorY] = useState(null);
  const [skipFirst, setSkipFirst] = useState(true);

  useEffect(() => {
    setDisplay(compareStrings(input, words)); //-text
  }, [input, words]); //-text

  useEffect(() => {
    detectCursorMovement();
  }, [display]);

  //Reseting the variables
  useEffect(() => {
    setTopPosition(0);
    setLineOffset(0);
    setSkipFirst(true);
    setLastCursorY(null);
  }, [stage])

  const compareStrings = (input, words) => { //-text
    const inputWords = input.split(' ');
    //const textWordss = text.split(' ');
    const textWords = words;

    return textWords
      .map((word, index) => compareWords(inputWords[index] || '', word, index === inputWords.length - 1, index >= inputWords.length - 1))
      .join(' ');
  };

  const compareWords = (inputWord, targetWord, isCurrentWord, isNext) => {
    let result = '';

    for (let i = 0; i < Math.max(inputWord.length, targetWord.length); i++) {
      const inputChar = inputWord[i] || '';
      const targetChar = targetWord[i] || '';

      if (isCurrentWord && i === inputWord.length) {
        result += `<span class="cursor" id="cursor"></span>`;
      }

      if (inputChar === targetChar) { // Correct
        result += `<span class="correct">${targetChar}</span>`;
      } else if (!inputChar && targetChar && !isNext) { // Skipped
        result += `<span class="skipped">${targetChar}</span>`;
      } else if (!inputChar && targetChar) { // Next
        result += `<span class="next">${targetChar}</span>`;
      } else if (inputChar && !targetChar) { // Extra letters
        result += `<span class="extra">${inputChar}</span>`;
      } else { // Incorrect
        result += `<span class="incorrect">${targetChar}</span>`;
      }
    }

    if (isCurrentWord && inputWord.length === targetWord.length) {
      result += `<span class="cursor" id="cursor"></span>`;
    }

    return result;
  };

  const detectCursorMovement = () => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const cursorRect = cursor.getBoundingClientRect();

    console.log(cursorRect.top, lastCursorY, "||", lineOffset, skipFirst);

    if (lastCursorY !== null && cursorRect.top > lastCursorY) {
      if (!skipFirst) {
        setTopPosition(prev => prev - 47.6);
        setLineOffset(prev => prev + 1);
      } else {
        setSkipFirst(false);
        setLastCursorY(cursorRect.top);
      }
    } else if (lastCursorY !== null && cursorRect.top < lastCursorY) {
      if (lineOffset > 0) {
        setTopPosition(prev => prev + 47.6);
        setLineOffset(prev => prev - 1);
      } else {
        setSkipFirst(true);
        setLastCursorY(cursorRect.top);
      }
    } else {
      setLastCursorY(cursorRect.top);
    }
  };

  const calculateMaxHeight = () => {
    if (stage === 3) {
      return (30 * 4 * 1.1);
    }
    const lineHeight = 34 * 1.4;
    const visibleLines = 4;
    return `calc(${lineHeight * (visibleLines + lineOffset)}px)`;
  };

  return (
    <div>
      <div className={`display-container ${stage === 3 ? 'display-container-summary' : ''}`}
        style={{
          transition: stage === 2 ? "all 0s" : stage === 3 ? "all 1.25s" : "all 0.75s"
        }}>
        <p
          className={`display-text ${stage === 3 ? 'display-text-summary' : ''}`}
          style={{
            //Display-text properties depending on stage
            top: `${topPosition}px`,
            clipPath: `inset(${lineOffset * 34 * 1.4}px 0 0 0)`,
            maxHeight: calculateMaxHeight(),
            transition: stage === 2 ? "all 0s" : stage === 3 ? "all 1.25s" : "all 0.75s"
          }}
          dangerouslySetInnerHTML={{ __html: display }}
        />
      </div>
    </div>
  );
}

export default TextDisplay;