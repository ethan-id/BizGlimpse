import { StockData } from '@/types';
import React from 'react';
import { Tabs, Tab, Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from '@nextui-org/react';
import BarChart from './BarChart';

type StockProps = {
    stockData: StockData | null;
};

export const Stock: React.FC<StockProps> = ({stockData}) => {
    const chartData = {
        labels: ['Open Value', 'Previous Close', 'Regular Market Price', 'Volume'],
        datasets: [
            {
                label: `${stockData?.ticker} Data`,
                data: [
                    stockData?.open_value ? parseFloat(stockData.open_value) : 0,
                    stockData?.previous_close ? parseFloat(stockData.previous_close) : 0,
                    stockData?.regular_market_price ? parseFloat(stockData.regular_market_price) : 0,
                    stockData?.volume ? parseFloat(stockData.volume.replace(/,/g, '')) / 1_000_000 : 0 // Convert volume to millions for better scale in chart
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
            },
        ],
    };

    const basicInfoColumns = [
        { key: 'ticker', label: 'Ticker' },
        { key: 'open_value', label: 'Open Value' },
        { key: 'previous_close', label: 'Previous Close' },
        { key: 'market_cap', label: 'Market Cap' },
    ];

    const performanceColumns = [
        { key: 'regular_market_change', label: 'Market Change' },
        { key: 'regular_market_change_percent', label: 'Market Change (%)' },
        { key: 'regular_market_price', label: 'Regular Market Price' },
    ];

    const tradingInfoColumns = [
        { key: 'ask', label: 'Ask' },
        { key: 'bid', label: 'Bid' },
        { key: 'volume', label: 'Volume' },
        { key: 'avg_volume', label: 'Average Volume' },
    ];

    const keyMetricsColumns = [
        { key: 'beta', label: 'Beta' },
        { key: 'eps', label: 'EPS' },
        { key: 'pe_ratio', label: 'P/E Ratio' },
    ];

    return (
        <div>
            <Tabs>
            {[
                { title: 'Basic Information', columns: basicInfoColumns },
                { title: 'Performance', columns: performanceColumns },
                { title: 'Trading Information', columns: tradingInfoColumns },
                { title: 'Key Metrics', columns: keyMetricsColumns },
            ].map(tableInfo => (
                <Tab className='text-xl p-6' key={tableInfo.title} title={tableInfo.title}>
                    <Table aria-label={`${tableInfo.title} table with dynamic content`}>
                        <TableHeader columns={tableInfo.columns}>
                            {(column) => <TableColumn className='text-large' key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={[stockData]}>
                            {(item) => {
                                return (
                                <TableRow key={item?.ticker}>
                                    {(columnKey) => <TableCell className='text-medium'>{item != null ? item[columnKey as keyof StockData] : null}</TableCell>}
                                </TableRow>
                            )}}
                        </TableBody>
                    </Table>
                </Tab>
            ))}
            </Tabs>
            <BarChart data={chartData}/>
        </div>
    )
};