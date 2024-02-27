import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, HistogramSeriesPartialOptions, SeriesDataItemTypeMap, DeepPartial } from 'lightweight-charts';

interface VolumeHistogramProps {
    data: SeriesDataItemTypeMap['Histogram'][]; // Update the data type to match histogram data requirements
    chartOptions?: DeepPartial<HistogramSeriesPartialOptions>;
}

const VolumeHistogram = ({ data, chartOptions }: VolumeHistogramProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
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
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0
                    }
                }
            });

            const series = chartRef.current.addHistogramSeries({
                color: '#26a69a',
                ...chartOptions
            });

            series.setData(data);

            return () => {
                chartRef.current?.remove();
                chartRef.current = null;
            };
        }
    }, [data, chartOptions]);

    return (
        <div className='flex-1'>
            <div className='m-4 text-4xl font-bold relative'>Volume</div>
            <div className='relative' ref={chartContainerRef} />
        </div>
    );
};

export default VolumeHistogram;
