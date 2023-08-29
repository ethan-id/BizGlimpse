import { StockData } from '@/types';
import React from 'react';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";

type StockProps = {
    stockData: StockData | null;
};

export const Stock: React.FC<StockProps> = ({stockData}) => {

    const basicInfoColumns = [
        { key: "ticker", label: "Ticker" },
        { key: "open_value", label: "Open Value" },
        { key: "previous_close", label: "Previous Close" },
        { key: "market_cap", label: "Market Cap" },
    ];

    const performanceColumns = [
        { key: "regular_market_change", label: "Market Change" },
        { key: "regular_market_change_percent", label: "Market Change (%)" },
        { key: "regular_market_price", label: "Regular Market Price" },
    ];

    const tradingInfoColumns = [
        { key: "ask", label: "Ask" },
        { key: "bid", label: "Bid" },
        { key: "volume", label: "Volume" },
        { key: "avg_volume", label: "Average Volume" },
    ];

    const keyMetricsColumns = [
        { key: "beta", label: "Beta" },
        { key: "eps", label: "EPS" },
        { key: "pe_ratio", label: "P/E Ratio" },
    ];

    return (
        <div className="grid grid-cols-2 gap-8 mt-4">
            {[
                { title: "Basic Information", columns: basicInfoColumns },
                { title: "Performance", columns: performanceColumns },
                { title: "Trading Information", columns: tradingInfoColumns },
                { title: "Key Metrics", columns: keyMetricsColumns },
            ].map(tableInfo => (
                <div key={tableInfo.title}>
                    <h2 className="text-2xl m-2">{tableInfo.title}</h2>
                    <Table 
                        aria-label={`${tableInfo.title} table with dynamic content`}
                        className="mb-4"    
                    >
                        <TableHeader columns={tableInfo.columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={[stockData]}>
                            {(item) => (
                                <TableRow key={item?.ticker}>
                                    {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </div>
    )
};