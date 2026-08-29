"use client";

export default function DocsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Documentação da API</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Arquitetura Multi-Tenant</h2>
        <p className="text-gray-700">
          Nosso sistema utiliza isolamento baseado em <code>tenant_id</code>. Todas as queries ao banco de dados PostgreSQL 
          são validadas para garantir que os dados de um cliente nunca sejam expostos a outro.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Endpoints</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><code>/api/properties</code> - Gerenciamento de propriedades (GET, POST). Requer <code>tenant_id</code>.</li>
          <li><code>/api/users</code> - Gerenciamento de usuários (GET, POST). Requer <code>tenant_id</code>.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">RBAC</h2>
        <p className="text-gray-700">
          O controle de acesso baseado em funções (Role-Based Access Control) é implementado na camada de aplicação, 
          garantindo que ações administrativas sejam permitidas apenas conforme as permissões do usuário logado.
        </p>
      </section>
    </div>
  );
}

