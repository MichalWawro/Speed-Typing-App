import React, { useEffect, useState } from 'react'
import './TextDisplay.css';

function TextDisplay({ text, input, time }) {

    return (
        <div>
            <div className='text-display'>{text}</div>
            <div className='time-display'>time: {time}</div>
            <div className="input-container">
                <label className='input-label'>Type to start:</label>
                <div className='input-display'>{input}</div>
            </div>
        </div>

    )
}

export default TextDisplay;