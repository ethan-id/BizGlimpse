import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

export interface QuarterlyEarningsChartProps {
    data: {
        date: string;
        actual: number;
        estimate: number;
    }[];
}

const mapQuarterToDate = (quarter: string): string => {
    const [q, year] = quarter.split('Q');
    const month = ((parseInt(q, 10) - 1) * 3 + 1).toString().padStart(2, '0');
    return `${year}-${month}-01`;
};

const QuarterlyEarningsChart = ({ data }: QuarterlyEarningsChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.offsetWidth,
                height: 300,
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
            chartRef.current = chart;

            const seriesActual = chart.addHistogramSeries({
                color: '#4BFFB5',
                priceFormat: {
                    type: 'custom',
                    formatter: (price: any) => `$${price.toFixed(2)}`
                },
                priceScaleId: 'left',
            });

            const seriesEstimate = chart.addLineSeries({
                color: '#FF4976',
                lineWidth: 2,
                priceScaleId: 'right',
            });

            seriesActual.setData(data.map(({ date, actual }) => ({ time: mapQuarterToDate(date), value: actual })));
            seriesEstimate.setData(data.map(({ date, estimate }) => ({ time: mapQuarterToDate(date), value: estimate })));

            chart.timeScale().fitContent();

            const handleResize = () => {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight });
                chart.applyOptions({ width: chartContainerRef?.current?.offsetWidth, height: 300 });
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chartRef.current?.remove();
                chartRef.current = null;
            };
        }
    }, [data]);

    // Re-apply the chart dimensions on window resize
    useEffect(() => {
        if (chartRef.current && chartContainerRef.current) {
            chartRef.current.resize(chartContainerRef.current.offsetWidth, 300);
            chartRef.current.timeScale().fitContent();
        }
    }, [setWindowSize]);

    return (
        <section>
            <div className='m-4 text-2xl font-bold relative'>Earnings vs. Estimate (Quarterly)</div>
            <div className='relative' ref={chartContainerRef} />
        </section>    
    );
};

export default QuarterlyEarningsChart;
