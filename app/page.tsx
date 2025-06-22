'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/hero-section';
import { CountrySearch } from '@/components/country-search';
import { CountryCard } from '@/components/country-card';
import { CityCard } from '@/components/city-card';
import { VisaCard } from '@/components/visa-card';
import { InteractiveMap } from '@/components/interactive-map';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <CountrySearch />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <CountryCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CityCard />
              <VisaCard />
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-8 h-fit">
            <InteractiveMap />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-24 py-12 border-t border-slate-700"
        >
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Explore the world with comprehensive country information and interactive maps
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
              <span>Data from REST Countries API</span>
              <span>•</span>
              <span>Maps by OpenStreetMap</span>
              <span>•</span>
              <span>Built with Next.js</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}