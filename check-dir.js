const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
    conn.exec('ls -ld /var/www/portal-imobiliario/', (err, stream) => {
        stream.on('data', (d) => console.log('DIR:', d.toString()));
        stream.stderr.on('data', (d) => console.log('ERR:', d.toString()));
        stream.on('close', () => conn.end());
    });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});