import { CandlestickData } from 'lightweight-charts';

export const getAnalysisReport = async (ticker: string): Promise<CandlestickData[] | undefined> => {
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
        const chartData: CandlestickData[] = Object.keys(responseData).map((key) => {
            const { open, high, low, close, date_utc } = responseData[key];
            return {
                time: date_utc,
                open,
                high,
                low,
                close
            };
        });

        return chartData;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};