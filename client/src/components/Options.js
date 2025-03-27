import React, { useState } from 'react'
import './Options.css'

function Options({ stage, mode, setMode, setTime, setWordCount, reset }) {
    const [activeButton, setActiveButton] = useState(0);

    function handleOnClick (value, buttonIndex) {
        if(mode === 'time') {
            setTime(value)
        } else {
            setWordCount(value)
        }
        setActiveButton(buttonIndex);
    }

    return (
        <div className={`options-container ${stage !== 1 ? 'options-container-hidden' : '' }`}>
            <div className='options-box'>
                <button className={`mode-button ${mode === "time" ? 'active': ''}`} onClick={() => setMode('time')}>Time</button>
                <button className={`mode-button ${mode === "wordCount" ? 'active': ''}`} onClick={() => setMode('wordCount')}>Word Count</button>
                <>
                    {mode === 'time' ? (
                        <>
                            <button className={`option-button ${activeButton === 0 && mode === 'time' ? "active" : ""}`} onClick={() => handleOnClick(15, 0)}>15</button>
                            <button className={`option-button ${activeButton === 1 && mode === 'time' ? "active" : ""}`} onClick={() => handleOnClick(30, 1)}>30</button>
                            <button className={`option-button ${activeButton === 2 && mode === 'time' ? "active" : ""}`} onClick={() => handleOnClick(60, 2)}>60</button>
                            <button className={`option-button ${activeButton === 3 && mode === 'time' ? "active" : ""}`} onClick={() => handleOnClick(90, 3)}>90</button>
                        </>
                    ) : (
                        <>
                            <button className={`option-button ${activeButton === 0 && mode === 'wordCount' ? "active" : ""}`} onClick={() => handleOnClick(20, 0)}>20</button>
                            <button className={`option-button ${activeButton === 1 && mode === 'wordCount' ? "active" : ""}`} onClick={() => handleOnClick(40, 1)}>40</button>
                            <button className={`option-button ${activeButton === 2 && mode === 'wordCount' ? "active" : ""}`} onClick={() => handleOnClick(60, 2)}>60</button>
                            <button className={`option-button ${activeButton === 3 && mode === 'wordCount' ? "active" : ""}`} onClick={() => handleOnClick(80, 3)}>80</button>

                        </>
                    )}
                </>
            </div>
            <div className='reset-box'>
                <button className='reset-button' onClick={() => reset()}>Reset</button>
            </div>
        </div>
    )

};

export default Options;
