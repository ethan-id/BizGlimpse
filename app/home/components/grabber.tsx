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
import { OwnershipData } from './types/charts/OwnershipChartTypes';
import { CandlestickData, HistogramData } from 'lightweight-charts';
import { getAnalysisReport, getEarningsReport, getOwnershipData } from '../utils/grabber-utils';
import { UserInfo } from './UserInfo';
import CandlestickChart from './charts/CandlestickChart';
import VolumeHistogram from './charts/VolumeHistogram';
import QuarterlyEarningsChart from './charts/QuarterlyEarningsChart';
import OwnershipChart from './charts/OwnershipChart';
import CompanyCard from './CompanyCard';

export const Grabber = () => {
    const [ticker, setTicker] = useState('');
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [candlestickData, setCandlestickData] = useState<CandlestickData[] | undefined>([]);
    const [volumeData, setVolumeData] = useState<HistogramData[] | undefined>([]);
    const [earningsData, setEarningsData] = useState<QuarterlyEarningsChartProps['data'] | undefined>([]);
    const [ownershipData, setOwnershipData] = useState<OwnershipData>();
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

    const assetProfileData = {
        address1: 'One Apple Park Way',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014',
        country: 'United States',
        phone: '408-996-1010',
        website: 'http://www.apple.com',
        industry: 'Consumer Electronics',
        sector: 'Technology',
        longBusinessSummary: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services...',
        fullTimeEmployees: 137000,
    };


    return (
        <div className=''>
            {session && <UserInfo/>}
            
            <div className='flex flex-row gap-4 m-auto w-64'>
                <Input
                    type='text'
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder='Enter stock ticker...'
                />
                <Button 
                    color='primary'
                    variant='ghost'
                    onClick={async () => {
                        scrapeStockData();
                        const report = await getAnalysisReport(ticker);
                        const earnings = await getEarningsReport(ticker);
                        const ownerData = await getOwnershipData(ticker);
                        console.log(ownerData);
                        setOwnershipData(ownerData);
                        setEarningsData(earnings?.data);
                        setCandlestickData(report?.candlestickData);
                        setVolumeData(report?.volumeData);
                    }}
                >
                    Scrape!
                </Button>
            </div>

            {loading && !error && <Progress
                size='sm'
                isIndeterminate
                label='Loading...'
                className='max-w-md m-auto mt-12'
            />}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!error && stockData && candlestickData && <Stock stockData={stockData}/>}

            {!error && stockData && candlestickData && volumeData && ownershipData && earningsData && 
                <div className='grid grid-cols-3 gap-4 width-[1290px] my-10'>
                    <CompanyCard assetProfile={assetProfileData}/>
                    <CandlestickChart data={candlestickData}/>
                    <OwnershipChart data={ownershipData.data}/>
                    <VolumeHistogram data={volumeData}/>
                    <QuarterlyEarningsChart data={earningsData}/>
                </div>
            }
        </div>
    );
}
