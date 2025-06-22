'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, AlertCircle, RefreshCw } from 'lucide-react';
import { useTravelStore } from '@/store/travel-store';
import { fetchCountries, fetchCountryByName, fetchCityData, fetchVisaRequirements } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CountrySearch() {
  const {
    searchQuery,
    countries,
    selectedCountry,
    apiError,
    setSearchQuery,
    setCountries,
    setSelectedCountry,
    setCityData,
    setVisaRequirements,
    setIsLoading,
    setApiError,
  } = useTravelStore();
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCountries = async () => {
      if (countries.length === 0) {
        try {
          setApiError(null);
          const countryData = await fetchCountries();
          setCountries(countryData);
          setFilteredCountries(countryData);
        } catch (error) {
          setApiError(error instanceof Error ? error.message : 'Failed to load countries');
        }
      }
    };
    loadCountries();
  }, [countries.length, setCountries, setApiError]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCountries(countries);
      setShowSuggestions(false);
    }
  }, [searchQuery, countries]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = async (country: any) => {
    setIsLoading(true);
    setSelectedCountry(country);
    setSearchQuery(country.name.common);
    setShowSuggestions(false);

    try {
      // Fetch city data for the capital
      if (country.capital && country.capital[0]) {
        const cityData = await fetchCityData(country.capital[0], country.cca2);
        if (cityData) {
          // Update city data with actual coordinates from country data
          cityData.latitude = country.latlng[0];
          cityData.longitude = country.latlng[1];
          setCityData(cityData);
        }
      }

      // Fetch visa requirements
      const visaData = await fetchVisaRequirements(country.cca2);
      setVisaRequirements(visaData);
    } catch (error) {
      console.error('Error fetching additional data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const country = await fetchCountryByName(searchQuery);
      if (country) {
        await handleCountrySelect(country);
      }
    } catch (error) {
      console.error('Error searching country:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    try {
      setApiError(null);
      const countryData = await fetchCountries();
      setCountries(countryData);
      setFilteredCountries(countryData);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Failed to load countries');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8" ref={searchRef}>
      <div className="relative">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            />
            <ChevronDown 
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} 
            />
          </div>
          <Button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search
          </Button>
        </div>

        {apiError && (
          <div className="mt-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{apiError}</span>
            </div>
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-300 hover:bg-red-900/30"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          </div>
        )}

        <AnimatePresence>
          {showSuggestions && filteredCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto"
            >
              {filteredCountries.slice(0, 8).map((country) => (
                <motion.button
                  key={country.cca3}
                  whileHover={{ backgroundColor: 'rgb(51, 65, 85)' }}
                  onClick={() => handleCountrySelect(country)}
                  className="w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="w-6 h-4 object-cover rounded"
                  />
                  <div>
                    <div className="text-white font-medium">{country.name.common}</div>
                    <div className="text-slate-400 text-sm">{country.region}</div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}