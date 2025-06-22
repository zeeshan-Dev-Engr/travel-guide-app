'use client';

import { motion } from 'framer-motion';
import { useTravelStore } from '@/store/travel-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for MapContent to avoid SSR issues
const MapContent = dynamic(
  () => import('./map-content').then((mod) => mod.MapContent),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 bg-slate-700 rounded-b-lg flex items-center justify-center">
        <div className="text-slate-400">Loading map...</div>
      </div>
    )
  }
);

export function InteractiveMap() {
  const { selectedCountry, cityData, isLoading } = useTravelStore();

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
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse">
              <div className="h-96 bg-slate-600 rounded"></div>
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
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Interactive map will appear here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full"
    >
      <Card className="bg-slate-800 border-slate-600 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <MapPin className="w-5 h-5 text-green-400" />
            <span>Location Map</span>
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Explore {selectedCountry.name.common} and its capital city
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="h-96 relative">
            <MapContent selectedCountry={selectedCountry} cityData={cityData} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}