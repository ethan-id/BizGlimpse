'use client';
import React, { useState } from 'react';
import { StockData } from '@/types';
import { Stock } from './stock';
import { useSession } from 'next-auth/react';
import {
    Input,
    Button,
    Progress
} from '@nextui-org/react';
import { CandlestickData } from 'lightweight-charts';
import { getAnalysisReport } from '../utils/grabber-utils';
import { UserInfo } from './UserInfo';
import CandlestickChart from './CandlestickChart';
import VolumeHistogram from './VolumeHistogram';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData[] | undefined>([]);
    const [volumeData, setVolumeData] = useState<{ time: string | number; value: number }[] | undefined>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

    const scrapeStockData = async () => {
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

    return (
        <div className='flex flex-col'>
            {session && <UserInfo/>}
            
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
                    onClick={async () => {
                        scrapeStockData();
                        const report = await getAnalysisReport(ticker);
                        setCandlestickData(report?.candlestickData);
                        setVolumeData(report?.volumeData);
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

            {!error && stockData && candlestickData && <Stock stockData={stockData}/>}

            {!error && stockData && candlestickData && volumeData && <div className='grid grid-cols-2 gap-4 width-[1290px]'>
                <CandlestickChart data={candlestickData}/>
                <VolumeHistogram data={volumeData}/>
            </div>}
        </div>
    );
}
