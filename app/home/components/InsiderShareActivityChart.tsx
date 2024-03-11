import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ShareActivityData } from './types/ShareActivityCard';

export const InsiderShareActivityChart = ({ data }: { data: ShareActivityData }) => {
    const chartData = {
        labels: ['Buy Shares', 'Sell Shares', 'Net Shares'],
        datasets: [
            {
                label: 'Share Activity',
                data: [
                    data.buyInfoShares?.raw,
                    data.sellInfoShares?.raw,
                    data.netInfoShares?.raw
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                    '#4BFFB5',
                    '#FF6384',
                    '#FFCE56'
                ],
                borderWidth: 1
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value: any) {
                        return `${value}`;
                    },
                    color: '#D9D9D9' // Text color
                },
                grid: {
                    color: '#404040' // Grid line color
                }
            },
            x: {
                ticks: {
                    color: '#D9D9D9' // Text color
                },
                grid: {
                    color: '#404040' // Grid line color
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: '#D9D9D9' // Legend text color if needed
                }
            }
        },
        layout: {
            padding: 20 // Optional padding
        },
        maintainAspectRatio: false,
        backgroundColor: '#2B2B43'
    };

    return (
        <div className='relative'>
            <div className='m-4 text-2xl font-bold'>Insider Share Activity</div>
            <div className='bg-grid-line p-2 h-5/6'>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};
