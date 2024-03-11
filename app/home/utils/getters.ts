import { CandlestickData, HistogramData } from 'lightweight-charts';
import { QuarterlyEarningsChartProps } from '../components/charts/QuarterlyEarningsChart';
import { OwnershipData } from '../components/types/charts/OwnershipChartTypes';
import { CompanyCardProps } from '../components/types/CompanyCard';
import { ShareActivityData } from '../components/types/ShareActivityCard';

interface AnalysisReport {
    candlestickData: CandlestickData[];
    volumeData: HistogramData[];
}

export const getAnalysisReport = async (ticker: string): Promise<AnalysisReport | undefined> => {
    const axios = require('axios');
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history',
        params: {
            symbol: ticker,
            interval: '1d',
            diffandsplits: 'false'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const responseData = response.data.body;
        const candlestickData: CandlestickData[] = [];
        const volumeData: HistogramData[] = [];

        Object.keys(responseData).forEach((key) => {
            const { open, high, low, close, volume, date_utc } = responseData[key];
            candlestickData.push({
                time: date_utc,
                open,
                high,
                low,
                close
            });
            volumeData.push({
                time: date_utc,
                value: volume
            });
        });

        return { candlestickData, volumeData };
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getEarningsReport = async (symbol: string): Promise<{ data: QuarterlyEarningsChartProps['data'] } | undefined> => {
    const axios = require('axios');
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
        params: {
          ticker: symbol,
          module: 'earnings'
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };

    try {
        const response = await axios.request(options);
        const quarterlyEarnings = response.data.body.earnings.earningsChart.quarterly;
        
        const data = quarterlyEarnings.map((entry: {date: string, actual: {raw: number}, estimate: {raw: number}}) => ({
            date: entry.date,
            actual: entry.actual.raw,
            estimate: entry.estimate.raw
        }));

        return { data };
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getOwnershipData = async (symbol: string): Promise<OwnershipData | undefined> => {
    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
        params: {
            ticker: symbol,
            module: 'institution-ownership'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);

        return { data: response.data.body };
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getCompanyCardData = async (symbol: string): Promise<CompanyCardProps | undefined> => {
    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
        params: {
            ticker: symbol,
            module: 'asset-profile'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);

        return { assetProfile: response.data.body };
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getShareActivityData = async (symbol: string): Promise<ShareActivityData | undefined> => {
    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules',
        params: {
            ticker: symbol,
            module: 'net-share-purchase-activity'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        
        return response.data.body;
    } catch (error) {
        console.error(error);
    }
};
