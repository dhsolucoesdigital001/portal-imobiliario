'use client';
import React, { useEffect, useState } from 'react';

interface Lead {
  id: string;
  olx_id: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar leads:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard do Corretor</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-gray-500">Imóveis Ativos</h2>
          <p className="text-3xl font-bold">{leads.length || 0}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Leads OLX Recentes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">ID OLX</th>
                <th className="p-4">Status</th>
                <th className="p-4">Data</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: Lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="p-4">{lead.olx_id || 'N/A'}</td>
                  <td className="p-4">{lead.status || 'Pendente'}</td>
                  <td className="p-4">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
