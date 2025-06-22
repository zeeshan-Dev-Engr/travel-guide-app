'use client';

import { motion } from 'framer-motion';
import { VisaRequirement } from '@/store/travel-store';
import { Import as Passport, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { useTravelStore } from '@/store/travel-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function VisaCard() {
  const { visaRequirements, selectedCountry, isLoading } = useTravelStore();

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
              <div className="h-4 bg-slate-600 rounded w-3/4"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-600 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!selectedCountry || visaRequirements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <Card className="bg-slate-800 border-slate-600 border-dashed">
          <CardContent className="flex items-center justify-center h-48">
            <div className="text-center">
              <Passport className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">Visa requirements will appear here</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const getVisaIcon = (requirement: string) => {
    switch (requirement) {
      case 'visa-free':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'visa-required':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'visa-on-arrival':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'e-visa':
        return <FileText className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getVisaBadgeColor = (requirement: string) => {
    switch (requirement) {
      case 'visa-free':
        return 'bg-green-900 text-green-100';
      case 'visa-required':
        return 'bg-red-900 text-red-100';
      case 'visa-on-arrival':
        return 'bg-yellow-900 text-yellow-100';
      case 'e-visa':
        return 'bg-blue-900 text-blue-100';
      default:
        return 'bg-gray-900 text-gray-100';
    }
  };

  const formatRequirement = (requirement: string) => {
    return requirement.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <Card className="bg-slate-800 border-slate-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Passport className="w-5 h-5 text-blue-400" />
            <span>Visa Requirements</span>
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Travel requirements for {selectedCountry.name.common} passport holders
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {visaRequirements.map((visa, index) => (
              <motion.div
                key={visa.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-slate-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getVisaIcon(visa.requirement)}
                    <span className="text-white font-medium">{visa.country}</span>
                  </div>
                  <Badge className={getVisaBadgeColor(visa.requirement)}>
                    {formatRequirement(visa.requirement)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  {visa.daysAllowed && (
                    <span className="text-slate-300">
                      Stay up to {visa.daysAllowed} days
                    </span>
                  )}
                  {visa.notes && (
                    <span className="text-slate-400 text-xs">
                      {visa.notes}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <Separator className="bg-slate-600 my-4" />

          <div className="text-xs text-slate-400 text-center">
            <p>This information is for reference only. Please verify current visa requirements with official sources before traveling.</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}