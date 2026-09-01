import React from 'react';

const DashboardImobiliaria = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Corretor</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Imóveis Ativos</h2>
          <p className="text-3xl">12</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Visitas Agendadas</h2>
          <p className="text-3xl">5</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold">Propostas Pendentes</h2>
          <p className="text-3xl">2</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardImobiliaria;
