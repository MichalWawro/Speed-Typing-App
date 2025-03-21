import React, { useEffect } from "react";
import './Counter.css';

function Counter({ stage, setStage, time, setTime, wordCount, setWordCount, justReset, setKeyListener }) {

    useEffect(() => {
        if (!justReset) {
            //if(stage === 2)
            const interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime < 1) {
                        setKeyListener(false);
                        //setStage(2)
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [justReset, time]);

    return (
        <div className='counters-container'>
            <div className='time-display'>{time}</div>
            <div className='word-counter'>{wordCount}</div>
        </div>
    )
}

export default Counter;