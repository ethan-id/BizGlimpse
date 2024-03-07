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
import { QuarterlyEarningsChartProps } from './charts/QuarterlyEarningsChart';
import { CandlestickData, HistogramData } from 'lightweight-charts';
import { getAnalysisReport, getEarningsReport } from '../utils/grabber-utils';
import { UserInfo } from './UserInfo';
import CandlestickChart from './charts/CandlestickChart';
import VolumeHistogram from './charts/VolumeHistogram';
import QuarterlyEarningsChart from './charts/QuarterlyEarningsChart';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData[] | undefined>([]);
    const [volumeData, setVolumeData] = useState<HistogramData[] | undefined>([]);
    const [earningsData, setEarningsData] = useState<QuarterlyEarningsChartProps['data'] | undefined>([]);
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
        <div className=''>
            {session && <UserInfo/>}
            
            <div className='flex flex-row gap-4 m-auto w-64'>
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
                        const earnings = await getEarningsReport(ticker);
                        setEarningsData(earnings?.data);
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

            {!error && stockData && candlestickData && volumeData && earningsData && <div className='grid grid-cols-2 gap-4 width-[1290px] my-10'>
                <CandlestickChart data={candlestickData}/>
                <VolumeHistogram data={volumeData}/>
                <QuarterlyEarningsChart data={earningsData}/>
            </div>}
        </div>
    );
}
