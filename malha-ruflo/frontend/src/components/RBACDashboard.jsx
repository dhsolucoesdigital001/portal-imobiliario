import React from 'react';

const RBACDashboard = ({ role }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel: {role}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">Gerenciamento de {role === 'Super Admin' ? 'Todos' : 'Meus'} Imóveis</div>
        {role === 'Super Admin' && <div className="p-4 bg-white shadow rounded">Gestão de Usuários</div>}
        <div className="p-4 bg-white shadow rounded">Relatórios de Desempenho</div>
      </div>
    </div>
  );
};

export default RBACDashboard;
