'use client';
import React, { useState } from 'react';
import { StockData } from '@/types';
import { Stock } from './stock';
import { signOut, useSession } from 'next-auth/react';
import { MyParticles } from './particles'; // Fix: Change the import statement to match the actual filename in a case-sensitive manner.
import {
    Input,
    Button,
    ButtonGroup,
    Progress,
    Avatar
} from '@nextui-org/react';
import { CandlestickData } from 'lightweight-charts';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();
    const axios = require('axios');

    const fetchStockData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/scrape/${ticker}`);
            const data = await response.json();

            if (response.ok) {
                setStockData(data);
            } else {
                console.log('error')
                setError(data.message || 'An error occurred');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const getAnalysisReport = async (ticker: string) => {
        const options = {
            method: 'GET',
            url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history',
            params: {
                    symbol: ticker,
                    interval: '1d',
                    diffandsplits: 'false',
            },
            headers: {
                    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
            }
        };
      
        try {
            const response = await axios.request(options);
            const responseData = response.data.body;
            const chartData: CandlestickData[] = Object.keys(responseData).map((key) => {
                const { open, high, low, close, date_utc } = responseData[key];
                return {
                    time: date_utc, // Assuming the 'date' is in the format 'YYYY-MM-DD' required by the chart library
                    open,
                    high,
                    low,
                    close,
                };
            });

            setCandlestickData(chartData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col'>
            <MyParticles/>
            {session && <div className='absolute top-10 right-10 z-10 flex items-center'>
                <ButtonGroup>
                   <Button onClick={() => signOut()}>Sign out</Button>
                </ButtonGroup>
                <Avatar className='ml-4' src={session.user?.image as string}/>
            </div>}
            <div className='flex flex-row gap-4 m-auto'>
                <Input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter stock ticker..."
                />
                <Button 
                    color="primary"
                    variant="ghost"
                    onClick={() => {
                        fetchStockData();
                        getAnalysisReport(ticker);
                    }}
                >
                    Scrape!
                </Button>
            </div>

            {loading && !error && <Progress
                size="sm"
                isIndeterminate
                label="Loading..."
                className="max-w-md m-auto mt-12"
            />}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!error && stockData && candlestickData && <Stock stockData={stockData} candlestickData={candlestickData}/>}
        </div>
    );
}
