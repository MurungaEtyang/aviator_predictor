import './assets/css/aviatorPredictor.css';
import React, { useState, useEffect } from 'react';

const AviatorPredictor: React.FC = () => {
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const generateRandomNumber = () => {
        setIsLoading(true);
        setRandomNumber(null);

        setTimeout(() => {
            const newRandomNumber = (Math.random() * 5).toFixed(1);
            setRandomNumber(parseFloat(newRandomNumber));
            setIsLoading(false);
        }, 10000);
    };

    useEffect(() => {
        if (randomNumber === null) {
            setIsLoading(true);

            setTimeout(() => {
                const newRandomNumber = (Math.random() * 5).toFixed(1);
                setRandomNumber(parseFloat(newRandomNumber));
                setIsLoading(false);
            }, 10000);
        }
    }, []);

    return (
        <div >
            <div
                className={`random-numbers`}
            >
                {isLoading ? 'Please wait...' : randomNumber}
            </div>
            <button onClick={generateRandomNumber}>Generate Random Number</button>
        </div>
    );
};

export default AviatorPredictor;