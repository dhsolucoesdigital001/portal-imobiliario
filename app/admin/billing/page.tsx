"use client";
import React from 'react';

export default function BillingDashboard() {
  const plans = [
    { id: '1', name: 'Imobiliária Alpha', status: 'Ativo' },
    { id: '2', name: 'Imobiliária Beta', status: 'Trial' },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">Faturamento & Planos</h1>
        <p className="text-neutral-600">Gerencie assinaturas e acesso de imobiliárias.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-neutral-700">Imobiliária</th>
              <th className="px-6 py-4 font-semibold text-neutral-700">Status</th>
              <th className="px-6 py-4 font-semibold text-neutral-700 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-neutral-50/50 transition">
                <td className="px-6 py-4 font-medium text-neutral-900">{plan.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    plan.status === 'Ativo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
