const { Client } = require('ssh2');
const conn = new Client();

console.log('Iniciando conexão com a VPS...');

conn.on('ready', () => {
  console.log('SSH Conectado! Ligando o Docker e subindo o sistema...');
  
  const comando = 'systemctl start docker && cd /var/www/portal-imobiliario && docker compose up -d --build && sleep 10 && curl -s http://localhost:3000 | head -n 15';
  
  conn.exec(comando, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('\nProcesso encerrado. Fechando conexão.');
      conn.end();
    }).on('data', (data) => {
      console.log('RETORNO DA VPS:\n' + data.toString());
    }).stderr.on('data', (data) => {
      console.error('LOGS/ERROS:\n' + data);
    });
  });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});