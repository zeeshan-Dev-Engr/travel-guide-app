'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapContentProps {
  selectedCountry: any;
  cityData: any;
}

export function MapContent({ selectedCountry, cityData }: MapContentProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (selectedCountry && mapRef.current && selectedCountry.latlng && selectedCountry.latlng.length >= 2) {
      const lat = selectedCountry.latlng[0];
      const lng = selectedCountry.latlng[1];
      mapRef.current.setView([lat, lng], 6);
    }
  }, [selectedCountry]);

  // Create custom icon for Leaflet
  const createCustomIcon = () => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      return new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    }
    return null;
  };

  const customIcon = createCustomIcon();

  if (!selectedCountry.latlng || selectedCountry.latlng.length < 2) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-400">
        Coordinates not available
      </div>
    );
  }

  return (
    <MapContainer
      center={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}
      zoom={6}
      scrollWheelZoom={true}
      className="h-full w-full rounded-b-lg"
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Country marker */}
      {customIcon && (
        <Marker
          position={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}
          icon={customIcon}
        >
          <Popup>
            <div className="text-center">
              <img
                src={selectedCountry.flags.png}
                alt={`Flag of ${selectedCountry.name.common}`}
                className="w-12 h-8 object-cover mx-auto mb-2 rounded"
              />
              <h3 className="font-bold text-slate-800">{selectedCountry.name.common}</h3>
              <p className="text-sm text-slate-600">{selectedCountry.region}</p>
              <p className="text-xs text-slate-500 mt-1">
                Population: {new Intl.NumberFormat().format(selectedCountry.population)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Capital city marker if available */}
      {cityData && customIcon && (
        <Marker
          position={[cityData.latitude, cityData.longitude]}
          icon={customIcon}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-slate-800">{cityData.name}</h3>
              <p className="text-sm text-slate-600">Capital City</p>
              <p className="text-xs text-slate-500 mt-1">
                Population: {new Intl.NumberFormat().format(cityData.population)}
              </p>
              {cityData.elevationMeters && (
                <p className="text-xs text-slate-500">
                  Elevation: {cityData.elevationMeters}m
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}