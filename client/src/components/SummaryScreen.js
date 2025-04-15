import React, { useEffect, useState } from "react";
import './SummaryScreen.css';

function SummaryScreen({ stage, input, text, words, target, mode }) {
    const [WPM, setWPM] = useState(0);
    useEffect(() => {
        if (stage === 3) {
            calculateStats()
        }
    }, [stage])

    function calculateStats() {
        // countCorrectWords

        setWPM(0)
    }

    return (
        <div className={`summary-container ${stage !== 3 ? 'summary-container-hidden' : ''}`}>
            <div className="summary-stats">
                {WPM}
            </div>
        </div>
    )
}

export default SummaryScreen;

// Stats to display:
// test type, mode
// wpm = word/min
// characters correct/incorrect/missed/extra
// acc = correct/all characters
// best run -> mode: wpm: acc: (best ustalany na podstawie wpm, correct only)