import React, { useEffect } from "react";
import './Counter.css';

function Counter({ stage, setStage, time, setTime, justReset, setKeyListener }) {

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
        <div className='time-display'>time: {time}</div>
    )
}

export default Counter;