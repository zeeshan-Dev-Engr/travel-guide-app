import { create } from 'zustand';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  latlng: number[];
  cca2: string;
  cca3: string;
}

export interface CityData {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  elevationMeters?: number;
}

export interface VisaRequirement {
  country: string;
  requirement: 'visa-free' | 'visa-required' | 'visa-on-arrival' | 'e-visa';
  daysAllowed?: number;
  notes?: string;
}

interface TravelState {
  selectedCountry: Country | null;
  cityData: CityData | null;
  visaRequirements: VisaRequirement[];
  isLoading: boolean;
  searchQuery: string;
  countries: Country[];
  apiError: string | null;
  
  setSelectedCountry: (country: Country | null) => void;
  setCityData: (city: CityData | null) => void;
  setVisaRequirements: (visa: VisaRequirement[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCountries: (countries: Country[]) => void;
  setApiError: (error: string | null) => void;
}

export const useTravelStore = create<TravelState>((set) => ({
  selectedCountry: null,
  cityData: null,
  visaRequirements: [],
  isLoading: false,
  searchQuery: '',
  countries: [],
  apiError: null,
  
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setCityData: (city) => set({ cityData: city }),
  setVisaRequirements: (visa) => set({ visaRequirements: visa }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCountries: (countries) => set({ countries }),
  setApiError: (error) => set({ apiError: error }),
}));