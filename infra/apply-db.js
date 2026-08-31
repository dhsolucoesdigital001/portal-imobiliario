const { Client } = require('ssh2');
const fs = require('fs');
const conn = new Client();

const sql = fs.readFileSync('db/seed.sql', 'utf8');

conn.on('ready', () => {
  console.log('SSH Conectado. Aplicando semente no banco...');
  conn.exec(`docker exec -i portal-imobiliario-db-1 psql -U user -d property_db <<EOF
    ${sql}
EOF`, (err, stream) => {
    if (err) throw err;
    stream.on('close', () => {
      console.log('Seed aplicada com sucesso!');
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