import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Register the chart types, elements, plugins, etc. that you want to use
Chart.register(...registerables);

type BarChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // Add this line

  useEffect(() => {
    if (chartContainer.current && chartInstance.current === null) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: data
        });
      }
    } else if (chartInstance.current) {
      // Update the chart data without creating a new instance
      chartInstance.current.data = data;
      chartInstance.current.update();
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null; // Reset the reference
      }
    };
  }, [data]);

  return <canvas style={{position: 'relative'}} ref={chartContainer} />;
};

export default BarChart;
