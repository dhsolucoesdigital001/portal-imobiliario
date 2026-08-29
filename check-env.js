const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
    // Vamos listar as variáveis de ambiente completas para acertar o usuário
    const cmd = `docker inspect portal-imobiliario-db-1 --format '{{json .Config.Env}}'`;
    
    conn.exec(cmd, (err, stream) => {
        stream.on('data', (d) => console.log('ENV:', d.toString()));
        stream.on('end', () => {
             console.log('Finalizado.');
             conn.end();
        });
    });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});