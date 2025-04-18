import React, { useState } from 'react'
import './Options.css'

function Options({ stage, mode, setMode, setRemainingTime, setInitialTime, setWordLimit }) {
    const [activeOptionIndex, setActiveOptionIndex] = useState(1);

    function handleOptionSelect(value, buttonIndex) {
        if (mode === 'time') {
            setRemainingTime(value);
            setInitialTime(value);
        } else {
            setWordLimit(value);
        }
        setActiveOptionIndex(buttonIndex);
    }

    return (
        <div className={`options-container ${stage !== 1 ? 'options-container-hidden' : ''}`}>
            <div className='options-box'>
                <button className={`mode-button ${mode === "time" ? 'active' : ''}`} onClick={() => setMode('time')}>Time</button>
                <button className={`mode-button ${mode === "wordLimit" ? 'active' : ''}`} onClick={() => setMode('wordLimit')}>Word Count</button>
                <>
                    {mode === 'time' ? (
                        <>
                            <button className={`option-button ${activeOptionIndex === 0 && mode === 'time' ? "active" : ""}`} onClick={() => handleOptionSelect(15, 0)}>15</button>
                            <button className={`option-button ${activeOptionIndex === 1 && mode === 'time' ? "active" : ""}`} onClick={() => handleOptionSelect(30, 1)}>30</button>
                            <button className={`option-button ${activeOptionIndex === 2 && mode === 'time' ? "active" : ""}`} onClick={() => handleOptionSelect(60, 2)}>60</button>
                            <button className={`option-button ${activeOptionIndex === 3 && mode === 'time' ? "active" : ""}`} onClick={() => handleOptionSelect(90, 3)}>90</button>
                        </>
                    ) : (
                        <>
                            <button className={`option-button ${activeOptionIndex === 0 && mode === 'wordLimit' ? "active" : ""}`} onClick={() => handleOptionSelect(20, 0)}>20</button>
                            <button className={`option-button ${activeOptionIndex === 1 && mode === 'wordLimit' ? "active" : ""}`} onClick={() => handleOptionSelect(40, 1)}>40</button>
                            <button className={`option-button ${activeOptionIndex === 2 && mode === 'wordLimit' ? "active" : ""}`} onClick={() => handleOptionSelect(60, 2)}>60</button>
                            <button className={`option-button ${activeOptionIndex === 3 && mode === 'wordLimit' ? "active" : ""}`} onClick={() => handleOptionSelect(80, 3)}>80</button>
                        </>
                    )}
                </>
            </div>
        </div>
    )

};

export default Options;
