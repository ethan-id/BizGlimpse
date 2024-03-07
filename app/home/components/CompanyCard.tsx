import React from 'react';
import { CompanyCardProps } from './types/CompanyCard';

const CompanyCard = ({ assetProfile }: CompanyCardProps) => {
    return (
        <div className='max-w-lg bg-grid-line text-custom-light rounded-xl shadow-lg relative'>
            <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{assetProfile.industry}</div>
                <p className='text-base'>
                    {assetProfile.longBusinessSummary}
                </p>
            </div>
            <div className='px-6 pt-4 pb-2'>
                <p className='text-sm'>Sector: {assetProfile.sector}</p>
                <p className='text-sm'>Employees: {assetProfile.fullTimeEmployees.toLocaleString()}</p>
                <p className='text-sm'>
                  {`${assetProfile.address1}, ${assetProfile.city}, ${assetProfile.state}, ${assetProfile.zip}, ${assetProfile.country}`}
                </p>
                <p className='text-sm'>Phone: {assetProfile.phone}</p>
            </div>
            <div className='px-6 pt-4 pb-2 flex justify-end'>
                <a href={assetProfile.website} target='_blank' rel='noopener noreferrer'
                className='bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200'>
                    Visit Website
                </a>
            </div>
        </div>
    );
};
  
  export default CompanyCard;