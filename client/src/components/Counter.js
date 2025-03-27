import React, { useEffect } from "react";
import './Counter.css';

function Counter({ stage, setStage, time, setTime, wordCount, setWordCount}) {

    useEffect(() => {
        if (stage === 2) {
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime < 1) {
                        setStage(3);
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [stage, time]);

    return (
        <div className={`counters-container ${stage !== 2 ? 'counters-container-hidden' : ''}`}>
            <div className='time-display'>{time}</div>
            <div className='word-counter'>{wordCount}</div>
        </div>
    )
}

export default Counter;