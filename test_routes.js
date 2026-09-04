const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testPropertiesRoute() {
  console.log('--- Testing /api/properties ---');
  try {
    const response = await axios.get(`${BASE_URL}/properties?tenant_id=550e8400-e29b-41d4-a716-446655440000`);
    console.log('Status:', response.status);
    console.log('Data structure valid:', Array.isArray(response.data.data));
  } catch (error) {
    console.error('Error testing /api/properties:', error.message);
    if (error.response) {
        console.error('Response Status:', error.response.status);
    }
  }
}

async function testOLXIntegrationRoute() {
    console.log('\n--- Testing /api/integrations/olx ---');
    try {
      const response = await axios.get(`${BASE_URL}/integrations/olx`);
      console.log('Status:', response.status);
    } catch (error) {
      console.error('Error testing /api/integrations/olx:', error.message);
      if (error.response) {
          console.error('Response Status:', error.response.status);
      }
    }
  }

async function runAll() {
  await testPropertiesRoute();
  await testOLXIntegrationRoute();
}

runAll();
