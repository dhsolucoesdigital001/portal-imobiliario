import { POST as postLeads } from '../app/api/leads/route';
import { POST as postProperties } from '../app/api/properties/route';
import { POST as postUsers } from '../app/api/users/route';

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
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
    process.env.N8N_LEAD_WEBHOOK_URL = ''; 

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

async function testPropertiesRoute() {
  console.log('Testing /api/properties...');
  // Simular busca ou criação? O route.ts deve ter um endpoint POST
  // Apenas tentar bater no endpoint
  const mockReq = {
      json: async () => ({
          title: 'Apartamento de teste',
          price: 500000
      })
  };

  try {
      const response = await postProperties(mockReq as unknown as Request);
      const body = await response.json();
      console.log('/api/properties status:', response.status, body);
  } catch (e) {
      console.error('ERROR: /api/properties failed - ' + e);
  }
}


async function runAllTests() {
  await testLeadsRoute();
  await testPropertiesRoute();
}

runAllTests();
