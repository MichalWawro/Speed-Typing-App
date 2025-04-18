import React, { useEffect, useState } from "react";
import './Stats.css';

function StatsSummary({ stage, input, targetWords, mode, initialTime, remainingTime, wordLimit }) {
    const [netWPM, setNetWPM] = useState(0);
    const [grossWPM, setGrossWPM] = useState(0);

    const [correctWords, setCorrectWords] = useState(41);
    const [totalWordsTyped, setTotalWordsTyped] = useState(44);

    const [accuracy, setAccuracy] = useState(0);
    const [letters, setLetters] = useState({});

    useEffect(() => {
        if (stage === 3) {
            calculateStats(input, targetWords, mode === 'time' ? initialTime : remainingTime);
        }
    }, [stage])

    function calculateStats(input, target, time) {
        const inputArray = input.split(' ');
        const wordsArray = target.slice(0, inputArray.length);
        setTotalWordsTyped(wordsArray.length);
        setGrossWPM(Math.round(6000 * inputArray.length / time) / 100);

        let correctWordsCounter = 0;
        let letterCounter = {
            correct: 0,
            incorrect: 0,
            missed: 0,
            extra: 0
        };

        for (let i = 0; i < inputArray.length; i++) {
            let shortWordLength = 0;

            //Correct Words
            if (inputArray[i] === wordsArray[i]) {
                correctWordsCounter++;
                letterCounter.correct += inputArray[i].length
            } else {
                //Extra/Missed
                if (inputArray[i].length > wordsArray[i].length) {
                    shortWordLength = wordsArray[i].length
                    letterCounter.extra += (Math.abs(inputArray[i].length - wordsArray[i].length));
                } else if (inputArray[i].length < wordsArray[i].length) {
                    shortWordLength = inputArray[i].length;
                    if (i != inputArray.length - 1) {
                        letterCounter.missed += (Math.abs(inputArray[i].length - wordsArray[i].length));
                    } else {
                        setGrossWPM(Math.round(6000 * (inputArray.length - 1) / time) / 100);
                        setTotalWordsTyped(wordsArray.length - 1);
                    }
                } else {
                    shortWordLength = inputArray[i].length;
                }

                //Correct/Incorrect
                for (let j = 0; j < shortWordLength; j++) {
                    if (inputArray[i][j] === wordsArray[i][j]) {
                        letterCounter.correct++;
                    } else {
                        letterCounter.incorrect++;
                    }
                }
            }
        }

        setNetWPM(Math.round(6000 * correctWordsCounter / time) / 100);
        setCorrectWords(correctWordsCounter);
        setAccuracy(Math.round(letterCounter.correct / (letterCounter.correct + letterCounter.incorrect + letterCounter.missed + letterCounter.extra) * 10000) / 100);
        setLetters({ correct: letterCounter.correct, incorrect: letterCounter.incorrect, missed: letterCounter.missed, extra: letterCounter.extra });
    }

    return (
        <div className={`stats-container ${stage !== 3 ? 'stats-container-hidden' : ''}`}>
            <div className="stats">
                <div className="words-per-minute">wpm:{netWPM}/{grossWPM}</div>
                <div className="words-correct">correct words: {correctWords}/{totalWordsTyped}</div>
                <div className="accuracy">accuracy: {accuracy}%</div>
                <div className="letters-all">letters: {letters.correct}/{letters.incorrect}/{letters.extra}/{letters.missed}</div>
            </div>
        </div>
    )
}

export default StatsSummary;