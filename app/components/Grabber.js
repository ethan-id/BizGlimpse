'use client';
import React, { useState } from 'react';
import {
    Input,
    Button,
    Progress
} from "@nextui-org/react";

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/scrape/${ticker}`);
            const data = await response.json();
            console.log(data)

            if (response.ok) {
                setStockData(data);
            } else {
                console.log('error')
                setError(data.message || "An error occurred");
            }

        } catch (err) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
        console.log(stockData);
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-4 m-12 m-auto'>
                <Input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter stock ticker..."
                />
                <Button 
                    color="primary"
                    variant="ghost"
                    onClick={fetchStockData}
                >
                    Scrape!
                </Button>
            </div>
            {loading && <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md m-auto mt-12"
            />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {stockData && <h1 className='m-auto mt-12'>{stockData.ticker}</h1>}
            {stockData && <hr></hr>}
            <div className='w-[80vw]'>
                {stockData && Object.keys(stockData).map((key) => {
                    return (
                        <div className='text-2xl flex flex-row justify-between'><strong>{key.replaceAll('_', ' ')}:</strong>{stockData[key]}</div>
                    )
                })}
            </div>
        </div>
    );
}
