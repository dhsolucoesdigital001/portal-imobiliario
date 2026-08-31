'use client';

import React, { useState } from 'react';

export default function SearchPage() {
  const [filter, setFilter] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Busca Geoespacial de Imóveis</h1>
      <input
        type="text"
        placeholder="Digite cidade ou estado..."
        className="border p-2 rounded mb-4 w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="bg-blue-600 text-white p-2 rounded">Filtrar</button>
      <p className="mt-4">Resultados para: {filter || 'Brasil'}</p>
    </div>
  );
}
