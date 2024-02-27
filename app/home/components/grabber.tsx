'use client';
import React, { useState } from 'react';
import { StockData } from '@/types';
import { Stock } from './stock';
import { signOut, useSession } from 'next-auth/react';
import {
    Input,
    Button,
    ButtonGroup,
    Progress,
    User
} from '@nextui-org/react';
import { CandlestickData } from 'lightweight-charts';
import { getAnalysisReport } from '../utils/grabber-utils';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData[] | undefined>([]);
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
            {session && <div>
                <ButtonGroup className='absolute top-10 right-10 z-10 flex items-center'>
                   <Button onClick={() => signOut()}>Sign out</Button>
                </ButtonGroup>
                <User
                    avatarProps={{
                        src: session.user?.image as string,
                    }}
                    className='absolute top-10 left-10 ml-4'
                    description={session.user?.email}
                    name={session.user?.name }
                />
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
                    onClick={async () => {
                        scrapeStockData();
                        setCandlestickData(await getAnalysisReport(ticker));
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
