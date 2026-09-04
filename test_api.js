
const BASE_URL = 'http://localhost:3000'; // Ajustar se necessário

async function testPropertiesGET() {
  console.log('--- Testando GET /api/properties ---');
  
  // 1. Teste sem tenant_id (Deve retornar 400)
  const res1 = await fetch(`${BASE_URL}/api/properties`);
  console.log('GET /api/properties (sem tenant_id):', res1.status, await res1.json());

  // 2. Teste válido (Supondo tenant existente no banco)
  const res2 = await fetch(`${BASE_URL}/api/properties?tenant_id=test-tenant`);
  console.log('GET /api/properties (com tenant):', res2.status);
  if (res2.ok) {
     const data = await res2.json();
     console.log('Dados recebidos:', JSON.stringify(data).substring(0, 100) + '...');
  }
}

async function testLeadsPOST() {
  console.log('\n--- Testando POST /api/leads ---');
  
  // 1. Teste com dados inválidos (Deve retornar 400)
  const res1 = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Jo' }) // nome muito curto
  });
  console.log('POST /api/leads (dados inválidos):', res1.status, await res1.json());

  // 2. Teste sem body (Deve falhar)
  const res2 = await fetch(`${BASE_URL}/api/leads`, { method: 'POST' });
  console.log('POST /api/leads (sem body):', res2.status);
}

// Executar testes (ambiente node assumido, pode precisar de --experimental-fetch)
// testPropertiesGET().then(testLeadsPOST);
console.log('Script de teste gerado em test_api.js. Execute com: node test_api.js');
