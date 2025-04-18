import React, { useEffect } from "react";
import './Counter.css';

function Counter({ stage, setStage, remainingTime, setRemainingTime, mode }) {

    useEffect(() => {
        if (stage === 2) {
            if (mode === 'time') {
                const interval = setInterval(() => {
                    setRemainingTime((prevTime) => {
                        if (prevTime < 1) {
                            setStage(3);
                            clearInterval(interval);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);

                return () => clearInterval(interval);
            } else {
                const interval = setInterval(() => {
                    setRemainingTime((prevTime) => {
                        return prevTime + 1;
                    });
                }, 1000);

                return () => clearInterval(interval);
            }
        }

    }, [stage, remainingTime]);

    return (
        <div className={`counters-container ${stage !== 2 ? 'counters-container-hidden' : ''}`}>
            <div className='time-display'>{remainingTime}</div>
        </div>
    )
}

export default Counter;