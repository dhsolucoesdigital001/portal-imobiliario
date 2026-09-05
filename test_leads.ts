import { POST } from './portal-imobiliario/app/api/leads/route';

async function testLeadsRoute() {
  console.log('Testing /api/leads...');
  
  // Mock request using a simple object that implements the interface expected by Next.js
  const mockReq = {
    json: async () => ({
      name: 'Teste QA',
      phone: '11999999999',
      property_id: '550e8400-e29b-41d4-a716-446655440000',
    })
  };

  try {
    // Manually setting env variable for test
    process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
    
    const response = await POST(mockReq as any);
    const result = await response.json();
    
    if (response.status === 200 && result.success) {
      console.log('PASS: /api/leads');
    } else {
      console.error('FAIL: /api/leads returned ' + response.status, result);
    }
  } catch (e) {
    console.error('ERROR: /api/leads failed - ' + e);
  }
}

testLeadsRoute();
