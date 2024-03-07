import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, CandlestickSeriesPartialOptions, CandlestickData, DeepPartial } from 'lightweight-charts';

interface CandlestickChartProps {
    data: CandlestickData[];
    chartOptions?: DeepPartial<CandlestickSeriesPartialOptions>;
}

const CandlestickChart = ({ data, chartOptions }: CandlestickChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    // State to trigger rerender on window resize
    const [, setSize] = useState({ width: 0, height: 0 });

    // Initialize chart
    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300, // Initial height, you might want to calculate this dynamically
                layout: {
                    background: {
                        color: '#2B2B43'
                    },
                    textColor: '#D9D9D9'
                },
                grid: {
                    vertLines: {
                        color: '#404040'
                    },
                    horzLines: {
                        color: '#404040'
                    }
                }
            });

            const handleResize = () => {
                // Trigger rerender to update width and height
                setSize({
                    width: chartContainerRef.current?.clientWidth || 0,
                    height: chartContainerRef.current?.clientHeight || 300 // Adjust as necessary
                });

                // Update chart size
                chartRef.current?.applyOptions({
                    width: chartContainerRef.current?.clientWidth,
                    height: 300 // Or another dynamic height calculation
                });
            };

            // Add resize event listener
            window.addEventListener('resize', handleResize);

            // Clean up
            return () => {
                window.removeEventListener('resize', handleResize);
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
        <section>
            <div className='m-4 text-2xl font-bold relative'>OHLC / Price History</div>
            <div className='relative' ref={chartContainerRef} />
        </section>
    );
};

export default CandlestickChart;
