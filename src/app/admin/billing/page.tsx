import React, { useState } from 'react';

export default function BillingDashboard() {
  const [plans, setPlans] = useState([
    { id: '1', name: 'Imobiliária Alpha', status: 'Ativo' },
    { id: '2', name: 'Imobiliária Beta', status: 'Trial' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Planos</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Imobiliária</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td className="border p-2">{plan.name}</td>
              <td className="border p-2">{plan.status}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
