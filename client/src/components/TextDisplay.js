import React, { useState, useEffect } from 'react';
import './TextDisplay.css';

function TextDisplay({ stage, userInput, targetWords }) {
  const [display, setDisplay] = useState('');

  const [verticalOffset, setVerticalOffset] = useState(0);
  const [scrolledLines, setScrolledLines] = useState(0);
  const [lastCursorY, setLastCursorY] = useState(null);
  const [skipFirst, setSkipFirst] = useState(true);

  useEffect(() => {
    setDisplay(generateDisplay(userInput, targetWords));
  }, [userInput, targetWords]);

  useEffect(() => {
    detectCursorMovement();
  }, [display]);

  useEffect(() => {
    setVerticalOffset(0);
    setScrolledLines(0);
    setSkipFirst(true);
    setLastCursorY(null);
  }, [stage])

  const generateDisplay = (userInput, targetWords) => {
    const inputWords = userInput.split(' ');

    return targetWords
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

      if (inputChar === targetChar) {
        result += `<span class="correct">${targetChar}</span>`;
      } else if (!inputChar && targetChar && !isNext) {
        result += `<span class="skipped">${targetChar}</span>`;
      } else if (!inputChar && targetChar) {
        result += `<span class="upcoming">${targetChar}</span>`;
      } else if (inputChar && !targetChar) {
        result += `<span class="extra">${inputChar}</span>`;
      } else {
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

    if (lastCursorY !== null && cursorRect.top > lastCursorY) {
      if (!skipFirst) {
        setVerticalOffset(prev => prev - 47.6);
        setScrolledLines(prev => prev + 1);
      } else {
        setSkipFirst(false);
        setLastCursorY(cursorRect.top);
      }
    } else if (lastCursorY !== null && cursorRect.top < lastCursorY) {
      if (scrolledLines > 0) {
        setVerticalOffset(prev => prev + 47.6);
        setScrolledLines(prev => prev - 1);
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
    return `calc(${lineHeight * (visibleLines + scrolledLines)}px)`;
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
            top: `${verticalOffset}px`,
            clipPath: `inset(${scrolledLines * 34 * 1.4}px 0 0 0)`,
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