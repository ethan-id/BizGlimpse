import { StockData } from '@/types';
import React from 'react';
import { Tabs, Tab, Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from '@nextui-org/react';

type StockProps = {
    stockData: StockData | null;
};

export const Stock = ({stockData}: StockProps) => {
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
        <div className='flex flex-col justify-center md:mx-56'>
            <Tabs className='flex justify-center mt-8'>
            {[
                { title: 'Basic Information', columns: basicInfoColumns },
                { title: 'Performance', columns: performanceColumns },
                { title: 'Trading Information', columns: tradingInfoColumns },
                { title: 'Key Metrics', columns: keyMetricsColumns }
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
                                    {(columnKey) => <TableCell className='text-medium'>{item != null ? String(item[columnKey as keyof StockData]) : null}</TableCell>}
                                </TableRow>
                            )}}
                        </TableBody>
                    </Table>
                </Tab>
            ))}
            </Tabs>
        </div>
    )
};