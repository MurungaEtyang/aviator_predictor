import React, { useState, useEffect } from 'react';

const AviatorPredictor = () => {
    const [progress, setProgress] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(60);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const generateRandomFloat = () => (Math.random() * 99) + 1;

        const updateProgress = () => {
            setProgress(generateRandomFloat());
        };

        const updateTimer = () => {

            const randomTimeInterval = (progress / 10) * generateRandomFloat() * 0.86 + 0.2;

            if (secondsRemaining > 0) {
                setSecondsRemaining((prevSeconds) => prevSeconds - 1);
            } else {

                setSecondsRemaining(randomTimeInterval * 500);
                updateProgress();
            }
        };


        updateProgress();

        const intervalId = setInterval(() => {
            updateTimer();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [progress]);

    const calculateColor = () => {
        const percentageRemaining = (secondsRemaining / 60) * 100;
        const hue = (percentageRemaining * 1.2).toFixed(0); // Adjust multiplier for faster/slower color change
        return `hsl(${hue}, 100%, 50%)`;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <ul className={`menu-list ${isMenuOpen ? 'open' : ''}`}>
                <li>
                    <a href="#about" onClick={toggleMenu}>
                        About
                    </a>
                </li>
                <li>
                    <a href="#subscription" onClick={toggleMenu}>
                        Subscription
                    </a>
                </li>
                <li>
                    <a href="#contact" onClick={toggleMenu}>
                        Contact
                    </a>
                </li>
            </ul>
            <div>
                <p>Time remaining: {Math.max(0, Number(secondsRemaining.toFixed(2)))} seconds</p>
            </div>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                <svg
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="lightgray"
                        strokeWidth="5"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={calculateColor()}
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray={`${Math.max(0, progress)} 283`}
                    />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Progress: {Math.max(0, progress).toFixed(2)}%
                </div>
            </div>
        </div>
    );
};

export default AviatorPredictor;
