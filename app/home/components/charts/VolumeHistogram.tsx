import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, HistogramSeriesPartialOptions, SeriesDataItemTypeMap, DeepPartial } from 'lightweight-charts';

interface VolumeHistogramProps {
    data: SeriesDataItemTypeMap['Histogram'][]; // Update the data type to match histogram data requirements
    chartOptions?: DeepPartial<HistogramSeriesPartialOptions>;
}

const VolumeHistogram = ({ data, chartOptions }: VolumeHistogramProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [, setSize] = useState({ width: 0, height: 0 });

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
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0
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

    useEffect(() => {
        if (!chartRef.current) return;

        const series = chartRef.current.addHistogramSeries({
            color: '#26a69a',
            ...chartOptions
        });

        series.setData(data);

        return () => {
            chartRef.current?.removeSeries(series);
        };
    }, [data, chartOptions]);

    return (
        <section className=''>
            <div className='m-4 text-2xl font-bold relative'>Volume</div>
            <div className='relative' ref={chartContainerRef} />
        </section>
    );
};

export default VolumeHistogram;
