import { Country, CityData, VisaRequirement } from '@/store/travel-store';

// REST Countries API
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    // 10 فیلڈز: name,capital,region,subregion,population,flags,languages,timezones,latlng,cca2
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,flags,languages,timezones,latlng,cca2');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Unable to load country data. Please check your internet connection and try again.');
  }
};

export const fetchCountryByName = async (name: string): Promise<Country | null> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name,capital,region,subregion,population,area,flags,languages,currencies,timezones,latlng,cca2,cca3`);
    if (!response.ok) throw new Error('Country not found');
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
};

// GeoDB Cities API (using free tier endpoints)
export const fetchCityData = async (cityName: string, countryCode?: string): Promise<CityData | null> => {
  try {
    // Using a free alternative or mock data for GeoDB Cities
    // In production, you would use the actual GeoDB Cities API with proper API key
    const searchQuery = countryCode ? `${cityName}, ${countryCode}` : cityName;
    
    // Mock data for demonstration - replace with actual API call
    const mockCityData: CityData = {
      id: 1,
      name: cityName,
      country: countryCode || 'Unknown',
      countryCode: countryCode || 'XX',
      region: 'Unknown Region',
      latitude: 0,
      longitude: 0,
      population: Math.floor(Math.random() * 10000000) + 100000,
      timezone: 'UTC',
      elevationMeters: Math.floor(Math.random() * 2000) + 10,
    };
    
    return mockCityData;
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};

// Mock visa requirements data
export const fetchVisaRequirements = async (countryCode: string): Promise<VisaRequirement[]> => {
  // Mock data - in production, this would come from a real visa API
  const mockVisaData: { [key: string]: VisaRequirement[] } = {
    US: [
      { country: 'Canada', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'United Kingdom', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Germany', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Japan', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'China', requirement: 'visa-required', notes: 'Tourist visa required' },
      { country: 'India', requirement: 'e-visa', daysAllowed: 30 },
    ],
    GB: [
      { country: 'United States', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Canada', requirement: 'visa-free', daysAllowed: 180 },
      { country: 'Australia', requirement: 'visa-required', notes: 'ETA required' },
      { country: 'Germany', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Japan', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Thailand', requirement: 'visa-free', daysAllowed: 30 },
    ],
    DE: [
      { country: 'United States', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'United Kingdom', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Canada', requirement: 'visa-free', daysAllowed: 180 },
      { country: 'Japan', requirement: 'visa-free', daysAllowed: 90 },
      { country: 'Australia', requirement: 'visa-required', notes: 'ETA required' },
      { country: 'Brazil', requirement: 'visa-free', daysAllowed: 90 },
    ],
  };
  
  return mockVisaData[countryCode] || [
    { country: 'Demo Country', requirement: 'visa-free', daysAllowed: 30, notes: 'Demo visa data for all other countries.' }
  ];
};