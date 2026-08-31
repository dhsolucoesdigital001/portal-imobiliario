"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -19.9829, // Betim - MG approx center
  lng: -44.1983
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

  useEffect(() => {
    // Simulação de busca
    fetch('/api/properties?tenant_id=betim-esmeraldas')
      .then(res => res.json())
      .then(data => setProperties(data.data));
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={options}
    >
      <MarkerClusterer>
        {(clusterer) =>
          properties.map((prop: any) => (
            <Marker
              key={prop.id}
              position={{ lat: prop.lat, lng: prop.lng }}
              clusterer={clusterer}
            />
          )) as any // Workaround for TS2769
        }
      </MarkerClusterer>
    </GoogleMap>
  ) : <></>;
}
