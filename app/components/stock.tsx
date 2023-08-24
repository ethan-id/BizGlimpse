import { StockData } from '@/types';
import React from 'react';

type StockProps = {
    stockData: StockData | null;
};

export const Stock: React.FC<StockProps> = ({stockData}) => {

    return (
        <div>
            <h1 className='flex justify-center m-auto mt-12 mb-2'>{stockData?.ticker}</h1>
            
            <hr></hr>
            
            <div className='w-[60vw] px-12 pt-2'>
                {stockData && Object.keys(stockData).map((key) => {
                    return (
                        <div className='text-2xl flex flex-row justify-between'>
                            <strong>{key.replaceAll('_', ' ')}:</strong>
                            {stockData[key as keyof StockData]}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};