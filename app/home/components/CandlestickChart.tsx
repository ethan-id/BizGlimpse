import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, CandlestickSeriesPartialOptions, CandlestickData, DeepPartial } from 'lightweight-charts';

interface CandlestickChartProps {
    data: CandlestickData[];
    chartOptions?: DeepPartial<CandlestickSeriesPartialOptions>;
}

const CandlestickChart = ({ data, chartOptions }: CandlestickChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    // Initialize chart
    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                    width: chartContainerRef.current.clientWidth,
                    height: 300,
                    layout: {
                        background: {
                            color: '#2B2B43'
                        },
                        textColor: '#D9D9D9',
                    },
                    grid: {
                        vertLines: {
                            color: '#404040',
                        },
                        horzLines: {
                            color: '#404040',
                        },
                    },
            });

            return () => {
                chartRef.current?.remove();
                chartRef.current = null;
            };
        }
    }, []);

    // Update chart data and options
    useEffect(() => {
        if (!chartRef.current) return;

        const series = chartRef.current.addCandlestickSeries({
            upColor: '#4BFFB5',
            downColor: '#FF4976',
            borderDownColor: '#FF4976',
            borderUpColor: '#4BFFB5',
            wickDownColor: '#838CA1',
            wickUpColor: '#838CA1',
            ...chartOptions,
        });

        series.setData(data);

        return () => {
            chartRef.current?.removeSeries(series);
        };
    }, [data, chartOptions]);

    return (
        <div className='shadow-lg'>
            <div className='m-4 text-4xl font-bold relative'>History</div>
            <div className='relative' ref={chartContainerRef} />
        </div>
    );
};

export default CandlestickChart;
