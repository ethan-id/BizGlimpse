import React from 'react';
import { CompanyCardProps } from './types/CompanyCard';
import {Card, CardBody, CardFooter, Link} from '@nextui-org/react';

const CompanyCard = ({ assetProfile }: CompanyCardProps) => {
    return (
        <Card className='max-w-lg overflow-hidden shadow-lg relative bg-[#2B2B43] text-white rounded-xl'>
            <CardBody className='p-6'>
                <h4 className='mb-2 font-bold'>{assetProfile.industry}</h4>
                <div className='text-base line-clamp-5'>
                    {assetProfile.longBusinessSummary}
                </div>
            </CardBody>
            <CardFooter className='px-6 pb-4 bg-grid-line'>
                <div className='text-sm space-y-2'>
                    <p>Sector: {assetProfile.sector}</p>
                    <p>Employees: {assetProfile.fullTimeEmployees.toLocaleString()}</p>
                    <p>
                        {`${assetProfile.address1}, ${assetProfile.city}, ${assetProfile.state}, ${assetProfile.zip}, ${assetProfile.country}`}
                    </p>
                    <p>Phone: {assetProfile.phone}</p>
                </div>
                <Link 
                    href={assetProfile.website} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='mt-4 bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 justify-end flex text-center'
                >
                    Visit Website
                </Link>
            </CardFooter>
        </Card>
    );
};
  
  export default CompanyCard;