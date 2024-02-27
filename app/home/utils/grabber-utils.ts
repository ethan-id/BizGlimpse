import { CandlestickData } from 'lightweight-charts';

interface AnalysisReport {
    candlestickData: CandlestickData[];
    volumeData: { time: string | number; value: number }[];
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
        const volumeData: { time: string | number; value: number }[] = [];

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
