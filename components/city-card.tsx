'use client';

import { motion } from 'framer-motion';
import { MapPin, Users, Mountain, Clock, Building } from 'lucide-react';
import { useTravelStore } from '@/store/travel-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function CityCard() {
  const { cityData, selectedCountry, isLoading } = useTravelStore();

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
              <div className="h-6 bg-slate-600 rounded mb-2"></div>
              <div className="h-4 bg-slate-600 rounded w-2/3"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-600 rounded"></div>
              <div className="h-4 bg-slate-600 rounded w-3/4"></div>
              <div className="h-4 bg-slate-600 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!cityData || !selectedCountry) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="bg-slate-800 border-slate-600 border-dashed">
          <CardContent className="flex items-center justify-center h-48">
            <div className="text-center">
              <Building className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Capital city information will appear here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat().format(population);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="bg-slate-800 border-slate-600 overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-white mb-1">
                {cityData.name}
              </CardTitle>
              <p className="text-slate-300">Capital City</p>
            </div>
            <Badge variant="secondary" className="bg-green-900 text-green-100">
              <Building className="w-3 h-3 mr-1" />
              Capital
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Users className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-slate-400 text-xs">Population</p>
                <p className="text-white text-sm font-medium">{formatPopulation(cityData.population)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mountain className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-slate-400 text-xs">Elevation</p>
                <p className="text-white text-sm font-medium">
                  {cityData.elevationMeters ? `${cityData.elevationMeters}m` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-slate-400 text-xs">Timezone</p>
                <p className="text-white text-sm font-medium">{cityData.timezone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-slate-400 text-xs">Coordinates</p>
                <p className="text-white text-sm font-medium">
                  {cityData.latitude.toFixed(2)}°, {cityData.longitude.toFixed(2)}°
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-3">
            <p className="text-slate-300 text-sm">
              <span className="text-blue-400 font-medium">{cityData.name}</span> serves as the capital and 
              largest metropolitan area of <span className="text-green-400 font-medium">{selectedCountry.name.common}</span>, 
              located in the <span className="text-purple-400 font-medium">{selectedCountry.region}</span> region.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}