import { POST as postLeads } from '../src/app/api/leads/route';

async function testLeadsRoute() {
  console.log('Testing /api/leads...');
  // Mock Request object
  const mockReq = {
    json: async () => ({
      name: 'Teste QA',
      phone: '11999999999',
      property_id: '550e8400-e29b-41d4-a716-446655440000',
    })
  };

  try {
    // Definir variável de ambiente mockada para contornar erros de conexão
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
process.env.N8N_LEAD_WEBHOOK_URL = ''; // Evitar chamada real

    
    // O router original espera um 'Request' real. Como estamos em node env, mockamos
    const response = await postLeads(mockReq as unknown as Request);
    const body = await response.json();
    
    if (response.status === 200) {
      console.log('PASS: /api/leads - Response:', body);
    } else {
      console.error('FAIL: /api/leads returned ' + response.status + ' - Body:', body);
    }
  } catch (e) {
    console.error('ERROR: /api/leads failed - ' + e);
  }
}

testLeadsRoute();
