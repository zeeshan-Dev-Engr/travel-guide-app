'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Globe, Clock, DollarSign, Languages, Mountain } from 'lucide-react';
import { useTravelStore } from '@/store/travel-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapContainer } from 'react-leaflet';

export function CountryCard() {
  const { selectedCountry, isLoading } = useTravelStore();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <div className="animate-pulse">
              <div className="h-8 bg-slate-600 rounded mb-2"></div>
              <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-600 rounded"></div>
              <div className="h-4 bg-slate-600 rounded w-2/3"></div>
              <div className="h-4 bg-slate-600 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!selectedCountry) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="bg-slate-800 border-slate-600 border-dashed">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Globe className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Select a country to view details</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat().format(population);
  };

  const formatArea = (area: number) => {
    return new Intl.NumberFormat().format(area);
  };

  const getLanguages = () => {
    if (!selectedCountry.languages) return 'N/A';
    return Object.values(selectedCountry.languages).join(', ');
  };

  const getCurrencies = () => {
    if (!selectedCountry.currencies) return 'N/A';
    return Object.values(selectedCountry.currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-slate-800 border-slate-600 overflow-hidden">
        <CardHeader className="relative">
          <div className="flex items-start space-x-4">
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedCountry.flags.svg}
              alt={`Flag of ${selectedCountry.name.common}`}
              className="w-20 h-14 object-cover rounded-md shadow-lg"
            />
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                {selectedCountry.name.common}
              </CardTitle>
              <p className="text-slate-300 text-lg">{selectedCountry.name.official}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className="bg-blue-900 text-blue-100">
                  {selectedCountry.region}
                </Badge>
                {selectedCountry.subregion && (
                  <Badge variant="outline" className="border-slate-500 text-slate-300">
                    {selectedCountry.subregion}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Capital</p>
                  <p className="text-white font-medium">
                    {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-slate-400 text-sm">Population</p>
                  <p className="text-white font-medium">{formatPopulation(selectedCountry.population)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mountain className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-slate-400 text-sm">Area</p>
                  <p className="text-white font-medium">{formatArea(selectedCountry.area)} km²</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Languages className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-sm">Languages</p>
                  <p className="text-white font-medium">{getLanguages()}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-sm">Currency</p>
                  <p className="text-white font-medium">{getCurrencies()}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-slate-400 text-sm">Timezones</p>
                  <p className="text-white font-medium text-sm">
                    {selectedCountry.timezones.slice(0, 2).join(', ')}
                    {selectedCountry.timezones.length > 2 && ` +${selectedCountry.timezones.length - 2} more`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-600" />

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Coordinates</span>
            <span className="text-white">
              {selectedCountry.latlng && selectedCountry.latlng.length >= 2
                ? `${selectedCountry.latlng[0]?.toFixed(4)}°, ${selectedCountry.latlng[1]?.toFixed(4)}°`
                : 'N/A'}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}