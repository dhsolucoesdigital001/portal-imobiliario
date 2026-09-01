const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Conectado. Instalando postgis no container...');
  conn.exec(`docker exec -u root portal-imobiliario-db-1 bash -c "apt-get update && apt-get install -y postgis postgresql-15-postgis-3"`, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('PostGIS instalado!');
      conn.end();
    }).on('data', (data) => process.stdout.write(data))
      .stderr.on('data', (data) => process.stderr.write(data));
  });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});
