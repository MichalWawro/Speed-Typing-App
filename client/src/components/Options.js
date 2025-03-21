import React, { useState } from 'react'
import './Options.css'

function Options({ mode, setMode, setTime, setWordCount, reset }) {
    const [value, setValue] = useState(30);


    return (
        <div className='options-container'>
            <div className='options-box'>
                <button className='mode-button' onClick={() => setMode('time')}>Time</button>
                <button className='mode-button' onClick={() => setMode('wordCount')}>Word Count</button>
                <>
                    {mode === 'time' ? (
                        <>
                            {/* <button className={`option-button ${time === 15 ? "active" : ""}`} onClick={() => setTime(15)}>15</button> */}
                            <button className='option-button' onClick={() => setTime(15)}>15</button>
                            <button className='option-button' onClick={() => setTime(30)}>30</button>
                            <button className='option-button' onClick={() => setTime(60)}>60</button>
                            <button className='option-button' onClick={() => setTime(90)}>90</button>
                        </>
                    ) : (
                        <>
                            <button className='option-button' onClick={() => setWordCount(20)}>20</button>
                            <button className='option-button' onClick={() => setWordCount(40)}>40</button>
                            <button className='option-button' onClick={() => setWordCount(60)}>60</button>
                            <button className='option-button' onClick={() => setWordCount(80)}>80</button>
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
