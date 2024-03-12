'use client';

import React, { useState } from 'react';
import {
    Input,
    Button,
    Progress
} from '@nextui-org/react';
import { QuarterlyEarningsChartProps } from './charts/QuarterlyEarningsChart';
import { OwnershipData } from './types/charts/OwnershipChartTypes';
import { CandlestickData, HistogramData } from 'lightweight-charts';
import { CompanyCardProps } from './types/CompanyCard';
import { ShareActivityData } from './types/ShareActivityCard';
import { getAnalysisReport, getCompanyCardData, getEarningsReport, getOwnershipData, getShareActivityData } from '../utils/getters';
import CandlestickChart from './charts/CandlestickChart';
import VolumeHistogram from './charts/VolumeHistogram';
import QuarterlyEarningsChart from './charts/QuarterlyEarningsChart';
import OwnershipChart from './charts/OwnershipChart';
import { InsiderShareActivityChart } from './InsiderShareActivityChart';
import CompanyCard from './CompanyCard';

export const HomePage = () => {
    const axios = require('axios');
    const [ticker, setTicker] = useState('');
    const [candlestickData, setCandlestickData] = useState<CandlestickData[] | undefined>([]);
    const [volumeData, setVolumeData] = useState<HistogramData[] | undefined>([]);
    const [earningsData, setEarningsData] = useState<QuarterlyEarningsChartProps['data'] | undefined>([]);
    const [ownershipData, setOwnershipData] = useState<OwnershipData>();
    const [profileData, setProfileData] = useState<CompanyCardProps>();
    const [shareAcivityData, setShareActivityData] = useState<ShareActivityData | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className='mt-10'>
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
                        try {
                            setLoading(true);
                            const report = await getAnalysisReport(ticker);
                            const earnings = await getEarningsReport(ticker);
                            const ownerData = await getOwnershipData(ticker);
                            const companyData = await getCompanyCardData(ticker);
                            const shareData = await getShareActivityData(ticker);
                            
                            setProfileData(companyData);
                            setOwnershipData(ownerData);
                            setEarningsData(earnings?.data);
                            setCandlestickData(report?.candlestickData);
                            setVolumeData(report?.volumeData);
                            setShareActivityData(shareData);
                            setLoading(false);
                        } catch (error) {
                            setError('An error occurred while fetching data. Please try again later.');
                            setLoading(false);
                        }
                    }}
                >
                    Search!
                </Button>
            </div>

            {loading && !error && <Progress
                size='sm'
                isIndeterminate
                label='Loading...'
                className='max-w-md m-auto mt-12'
            />}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!error && candlestickData && volumeData && ownershipData && earningsData && profileData && shareAcivityData && 
                <div className='grid grid-cols-3 gap-4 width-[1290px] my-10 items center'>
                    <CompanyCard assetProfile={profileData.assetProfile}/>
                    <CandlestickChart data={candlestickData}/>

                    <OwnershipChart data={ownershipData.data}/>
                    <VolumeHistogram data={volumeData}/>
                    <QuarterlyEarningsChart data={earningsData}/>
                    
                    <InsiderShareActivityChart data={shareAcivityData}/>
                </div>
            }
        </div>
    );
}
