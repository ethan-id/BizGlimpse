import {SVGProps} from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type History = {
  meta: Meta;
  body: { [key: string]: Body };
}

export interface Body {
    date: string;
    date_utc: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjclose: number;
}

export interface Meta {
    processedTime: Date;
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType:string;
    firstTradeDate: number;
    regularMarketTime: number;
    hasPrePostMarketData: boolean;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    priceHint: number;
    dataGranularity: string;
    range: string;
    version: string;
    status: number;
    copywrite: string;
}


export type StockData = {
    ask: string;
    avg_volume: string;
    beta: string;
    bid: string;
    days_range: string;
    dividend_yield: string;
    earnings_date: string;
    eps: string;
    ex_dividend_date: string;
    market_cap: string;
    open_value: string;
    pe_ratio: string;
    previous_close: string;
    regular_market_change: string;
    regular_market_change_percent: string;
    regular_market_price: string;
    ticker: string;
    volume: string;
    week_range: string;
    year_target_est: string;
    history: History;
}