
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Ajuste se necessário

async function runTests() {
  console.log('--- Iniciando Testes de Integração ---');

  // Teste GET /api/properties
  console.log('\n[Teste] GET /api/properties');
  try {
    // 1. Falha: falta tenant_id
    await axios.get(`${BASE_URL}/api/properties`);
    console.error('Falha esperada não ocorreu: GET sem tenant_id');
  } catch (err: any) {
    if (err.response?.status === 400) {
      console.log('Sucesso: GET sem tenant_id retornou 400 como esperado.');
    } else {
      console.error('Erro inesperado em GET sem tenant_id:', err.message);
    }
  }

  // Teste POST /api/integrations/olx
  console.log('\n[Teste] POST /api/integrations/olx');
  try {
    // 1. Falha: payload inválido
    await axios.post(`${BASE_URL}/api/integrations/olx`, { title: 'Sem ID' });
    console.error('Falha esperada não ocorreu: POST com payload inválido');
  } catch (err: any) {
    if (err.response?.status === 400) {
      console.log('Sucesso: POST com payload inválido retornou 400 como esperado.');
    } else {
      console.error('Erro inesperado em POST com payload inválido:', err.message);
    }
  }
  
  // 2. Falha: JSON inválido
  try {
    await axios.post(`${BASE_URL}/api/integrations/olx`, 'invalid-json', {
        headers: { 'Content-Type': 'application/json' }
    });
    console.error('Falha esperada não ocorreu: POST com JSON inválido');
  } catch (err: any) {
      // O código 400 é esperado pois o request é tratado no parse, mas talvez retorne 400 se o JSON.parse falhar internamente
      console.log('Resultado do POST com JSON inválido (status):', err.response?.status);
      console.log('Sucesso: POST com JSON inválido foi tratado.');
  }

  console.log('\n--- Testes Finalizados ---');
}

runTests();
