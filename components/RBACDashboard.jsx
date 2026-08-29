import React, { useEffect, useState } from 'react';

const RBACDashboard = ({ role }) => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Busca leads da API (ou simulação inicial)
    fetch('/api/leads-data')
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Gestão Imobiliária</h2>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">Dashboard</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">Imóveis</a>
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-800">Configurações</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-bold">Painel: {role}</h1>
        </header>

        <section className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
              <h3 className="text-gray-500 font-semibold uppercase">Total Imóveis</h3>
              <p className="text-3xl font-bold">128</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
              <h3 className="text-gray-500 font-semibold uppercase">Visitas</h3>
              <p className="text-3xl font-bold">1.450</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
              <h3 className="text-gray-500 font-semibold uppercase">Contratos</h3>
              <p className="text-3xl font-bold">45</p>
            </div>
          </div>

          {/* Tabela de Leads */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Leads Recentes</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Nome</th>
                  <th className="py-2">E-mail</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{lead.name}</td>
                    <td className="py-2">{lead.email}</td>
                    <td className="py-2">
                       <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs uppercase font-bold">Novo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RBACDashboard;
