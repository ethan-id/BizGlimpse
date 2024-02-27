import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, DeepPartial, CandlestickSeriesPartialOptions, CandlestickData } from 'lightweight-charts';

interface CandlestickChartProps {
  data: CandlestickData[];
  chartOptions?: DeepPartial<CandlestickSeriesPartialOptions>;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, chartOptions }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  let chart: IChartApi | null = null;
  let candleSeries: ISeriesApi<'Candlestick'> | null = null;

  useEffect(() => {
    if (chartContainerRef.current) {
      chart = createChart(chartContainerRef.current, { width: chartContainerRef.current.clientWidth, height: 300 });
      candleSeries = chart.addCandlestickSeries(chartOptions);

      candleSeries.setData(data);

      window.addEventListener('resize', resizeChart);
    }

    return () => {
      window.removeEventListener('resize', resizeChart);
      if (chart !== null) {
        chart.remove();
      }
    };

    function resizeChart() {
      if (chartContainerRef.current) {
        chart?.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    }
  }, []);

  return <div ref={chartContainerRef} />;
};

export default CandlestickChart;
