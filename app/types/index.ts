import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

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
}