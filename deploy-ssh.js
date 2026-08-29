const { Client } = require('ssh2');
const conn = new Client();

console.log('Iniciando conexão com a VPS...');

conn.on('ready', () => {
  console.log('SSH Conectado! Baixando versão Premium do GitHub e reconstruindo...');
  
  // COMANDO MESTRE: Atualiza o código, limpa o lixo e reconstrói o Docker do zero
  const comando = `
    cd /var/www/portal-imobiliario && \
    git remote set-url origin https://dhsolucoesdigital001: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@github.com/dhsolucoesdigital001/portal-imobiliario.git && \
    git fetch origin main && \
    git reset --hard origin/main && \
    git clean -fd && \
    docker compose down && \
    docker compose up -d --build
  `;
  
  conn.exec(comando, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('\nDeploy finalizado! Aguarde 30 segundos para o Next.js iniciar e atualize o navegador.');
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});