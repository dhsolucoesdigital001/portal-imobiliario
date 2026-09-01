const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  { key: 'FRONTEND_DOMAIN', prompt: 'Domínio do Frontend (ex: https://site.com): ' },
  { key: 'BACKEND_API_DOMAIN', prompt: 'Domínio da API Backend (ex: https://api.site.com): ' },
  { key: 'ADMIN_EMAIL', prompt: 'E-mail administrativo: ' },
  { key: 'SMTP_PASSWORD', prompt: 'Senha de app do e-mail (SMTP): ' },
  { key: 'DATABASE_URL', prompt: 'URL do PostgreSQL (ex: postgresql://user:pass@localhost:5432/db): ' }
];

const answers = {};

async function askQuestion(q) {
  return new Promise((resolve) => {
    rl.question(q.prompt, (answer) => {
      answers[q.key] = answer.trim();
      resolve();
    });
  });
}

async function run() {
  console.log('--- Instalação do Next Property App ---');
  for (const q of questions) {
    await askQuestion(q);
  }

  // Validações básicas
  if (!answers.FRONTEND_DOMAIN.startsWith('http')) {
     console.error('Erro: Domínio do Frontend deve começar com http ou https.');
     process.exit(1);
  }

  const envContent = Object.entries(answers)
    .map(([key, val]) => `${key}=${val}`)
    .join('\n');

  fs.writeFileSync(path.join(__dirname, '.env'), envContent);
  console.log('\nArquivo .env criado com sucesso!');

  console.log('Preparando estrutura inicial de banco de dados...');
  // Aqui você pode adicionar lógica para rodar migrations, ex: execSync('npx prisma db push');
  console.log('Banco de dados configurado (simulado).');

  rl.close();
}

run();
