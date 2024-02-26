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
    Progress
} from '@nextui-org/react';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { data: session } = useSession();

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

    return (
        <div className='flex flex-col'>
            <MyParticles/>
            {session && <div className='absolute top-10 right-10 z-10 flex items-center'>
                <p className='text-sm pr-4'>Signed in as {session.user?.email}</p>
                <ButtonGroup>
                   <Button onClick={() => signOut()}>Sign out</Button>
                </ButtonGroup>
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
                    onClick={fetchStockData}
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

            {!error && stockData && <Stock stockData={stockData}/>}
        </div>
    );
}
