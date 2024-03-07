export interface AssetProfile {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    website: string;
    industry: string;
    sector: string;
    longBusinessSummary: string;
    fullTimeEmployees: number;
}
  
export interface CompanyCardProps {
    assetProfile: AssetProfile;
}