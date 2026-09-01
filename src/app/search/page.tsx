import React from 'react';

const SearchPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Busca de Imóveis</h1>
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          placeholder="Digite a cidade ou bairro" 
          className="border p-2 flex-grow rounded"
        />
        <button className="bg-blue-600 text-white p-2 px-4 rounded">Buscar</button>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Resultados:</h2>
        <p className="text-gray-500">Nenhum imóvel encontrado.</p>
      </div>
    </div>
  );
};

export default SearchPage;
