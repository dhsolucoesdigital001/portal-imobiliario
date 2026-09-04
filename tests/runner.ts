
import { POST as postLeads } from '../portal-imobiliario/app/api/leads/route.ts';

async function testLeadsRoute() {
  console.log('Testing /api/leads...');
  // Mock request
  const mockReq = {
    json: async () => ({
      name: 'Teste QA',
      phone: '11999999999',
      property_id: '550e8400-e29b-41d4-a716-446655440000',
    })
  };

  try {
    const response = await postLeads(mockReq as any);
    if (response.status === 200) {
      console.log('PASS: /api/leads');
    } else {
      console.error('FAIL: /api/leads returned ' + response.status);
    }
  } catch (e) {
    console.error('ERROR: /api/leads failed - ' + e);
  }
}

testLeadsRoute();
