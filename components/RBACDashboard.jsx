import React from 'react';

const RBACDashboard = ({ role }) => {
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
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        <section className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </section>
      </main>
    </div>
  );
};

export default RBACDashboard;
