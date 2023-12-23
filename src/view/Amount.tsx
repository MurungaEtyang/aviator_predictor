// Amount.tsx
import React, { useState, useEffect } from 'react';

export const Amount: React.FC = () => {
    const [paidAmount, setPaidAmount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getPaidAmount = () => {
        setIsLoading(true);
        setError(null);

        fetch('http://192.168.43.76:8000/api/amount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setPaidAmount(data.amount);
                sessionStorage.setItem('amount', data.amount.toString());
            })
            .catch((error) => {
                setError('An error occurred while fetching the random number.');
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getPaidAmount();
    }, []);

    return (
        <div>
            <div>{isLoading ? 'Please wait...' : error || <h1>{paidAmount}</h1>}</div>
        </div>
    );
};

export const getAmount = async () => {
    try {
        const response = await fetch('http://192.168.43.76:8000/api/amount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        sessionStorage.setItem('amount', data.amount);

        return data.amount;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('An error occurred while fetching the amount.');
    }
};
