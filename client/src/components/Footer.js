import React from "react";
import './Footer.css';
import escapeIcon from '../resources/escape-icon-3.png';


function Footer({ stage }) {

    return (
        <div className="footer-container">
            <div className={`escape-icon-container ${stage === 1 ? 'escape-icon-container-hidden' : ''}`}>
                <img
                    src={escapeIcon}
                    alt="escape-icon"
                    className="escape-icon"
                />
                <p className="escape-text">Press Esc to restart</p>
            </div>
            <div className="footer-info">
                <a href="https://github.com/MichalWawro/Typing-Test-Game" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/michalwawro/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
        </div>
    )
}

export default Footer;