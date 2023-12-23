import './assets/css/aviatorPredictor.css';
import React, { useState } from 'react';

const AviatorPredictor: React.FC = () => {
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateRandomNumber = async () => {
        setIsLoading(true);
        setError(null);

        fetch('http://192.168.43.76:8000/api/aviatorNumber', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(async data => {
                await new Promise(resolve => setTimeout(resolve, 20000));
                setRandomNumber(data.number);
            })
            .catch(error => {
                setError('An error occurred while fetching the random number.');
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="random-container">
            <div className="circle-container">
                <div   className="circle"></div>
                <div className="water"></div>
                <div className="circle"></div>
            </div>
            <div className="number-display">
                <p className="random-numbers">{isLoading ? 'Please wait for 20 secs...' : error || randomNumber} 🗼</p>
                <button className="generate-button" onClick={generateRandomNumber}>Click Here</button>
            </div>
        </div>
    );
};

export default AviatorPredictor;
