'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin, Compass } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 min-h-[60vh] flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Globe className="w-16 h-16 text-blue-400 animate-spin" style={{ animationDuration: '20s' }} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <MapPin className="w-6 h-6 text-green-400 absolute top-2 right-2" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Explore the World by{' '}
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Country
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Discover detailed information about countries, their capitals, visa requirements, 
          and explore interactive maps to plan your next adventure.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center space-x-8 text-slate-400"
        >
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>195+ Countries</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Interactive Maps</span>
          </div>
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5" />
            <span>Visa Information</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}