"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -15.7801, // Brazil approx center
  lng: -47.9292
};

const options = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

export default function SearchPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });

  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Busca nacional - Injetar tenant_id dinamicamente em produção
    fetch('/api/properties?tenant_id=default-tenant') 
      .then(res => res.json())
      .then(data => setProperties(data.data || []));
  }, []);

  return isLoaded ? (
    <div className='flex flex-col gap-4'>
        <div className='p-4'>
            <h1 className="text-2xl font-bold mb-4">Busca Geoespacial de Imóveis</h1>
            <input
                type="text"
                placeholder="Digite cidade ou estado..."
                className="border p-2 rounded mb-4 w-full"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <button className="bg-blue-600 text-white p-2 rounded">Filtrar</button>
        </div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={options}
        >
            <MarkerClusterer>
                {(clusterer) =>
                  <div>
                    {properties.map((prop: any) => (
                        <Marker
                        key={prop.id}
                        position={{ lat: prop.lat, lng: prop.lng }}
                        clusterer={clusterer}
                        />
                    ))}
                  </div>
                }
            </MarkerClusterer>
        </GoogleMap>
    </div>
  ) : <></>;
}
