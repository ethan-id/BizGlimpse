import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, CandlestickSeriesPartialOptions, CandlestickData, DeepPartial, ISeriesApi, LineData } from 'lightweight-charts';
import { Switch } from '@nextui-org/react';
import { sma } from 'indicatorts';

interface CandlestickChartProps {
    data: CandlestickData[];
    chartOptions?: DeepPartial<CandlestickSeriesPartialOptions>;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, chartOptions }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const [smaSelected, setSmaSelected] = useState(false);
    // Update the state type to accommodate both null and the line series API
    const [smaSeries, setSmaSeries] = useState<ISeriesApi<'Line'> | null>(null);

    // Calculate SMA data once based on the provided data
    const closingPrices = data.map(d => d.close);
    const smaData: LineData[] = sma(14, closingPrices).map((value, index) => ({
        time: data[index + 14 - 1]?.time,
        value,
    })).filter(item => item.time); // Ensure we have the time field

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { color: '#2B2B43' },
                    textColor: '#D9D9D9',
                },
                grid: {
                    vertLines: { color: '#404040' },
                    horzLines: { color: '#404040' },
                },
            });

            const series = chart.addCandlestickSeries({
                upColor: '#4BFFB5',
                downColor: '#FF4976',
                borderDownColor: '#FF4976',
                borderUpColor: '#4BFFB5',
                wickDownColor: '#838CA1',
                wickUpColor: '#838CA1',
                ...chartOptions,
            });

            series.setData(data);
            chartRef.current = chart;

            const resizeObserver = new ResizeObserver(() => {
                chart.applyOptions({ width: chartContainerRef.current?.clientWidth, height: 300 });
            });
            resizeObserver.observe(chartContainerRef.current);

            return () => {
                resizeObserver.disconnect();
                chart.remove();
            };
        }
    }, [chartOptions, data]);

    useEffect(() => {
        if (!chartRef.current || !smaData.length) return;

        // Toggle the SMA series based on the switch
        if (smaSelected) {
            if (!smaSeries) {
                const lineSeries = chartRef.current.addLineSeries({
                    color: 'rgba(4, 111, 232, 1)',
                    lineWidth: 2,
                });
                lineSeries.setData(smaData);
                setSmaSeries(lineSeries);
            } else {
                smaSeries.setData(smaData);
            }
        } else if (smaSeries) {
            chartRef.current.removeSeries(smaSeries);
            setSmaSeries(null); // Reset the SMA series state after removal
        }
    }, [smaSelected, smaData, smaSeries]);

    return (
        <section className='col-span-2 self-end'>
            <div className='flex-col p-2'>
                <div className='m-4 text-2xl font-bold relative'>OHLC / Price History</div>
                <Switch isSelected={smaSelected} onChange={() => setSmaSelected(!smaSelected)}>
                    SMA
                </Switch>
            </div>
            <div ref={chartContainerRef} />
        </section>
    );
};

export default CandlestickChart;
