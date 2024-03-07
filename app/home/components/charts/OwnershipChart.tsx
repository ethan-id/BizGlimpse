import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {OwnershipData, OwnershipEntry} from '../types/charts/OwnershipChartTypes';

const OwnershipChart = (data: OwnershipData) => {
    const chartData = {
        labels: data.data.ownershipList.map((item: OwnershipEntry) => item.organization),
        datasets: [
            {
                label: 'Ownership Percentage',
                data: data.data.ownershipList.map((item: OwnershipEntry) => item.pctHeld.raw * 100), // Convert to percentage
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: '#4BFFB5',
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
                        return `${value}%`;
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
            <div className='m-4 text-2xl font-bold'>Ownership Data</div>
            <div className='bg-grid-line p-2 h-5/6'>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default OwnershipChart;
