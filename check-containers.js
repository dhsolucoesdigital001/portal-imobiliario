const { Client } = require('ssh2');
const conn = new Client();

conn.on('ready', () => {
  conn.exec('docker ps', (err, stream) => {
    stream.on('data', (data) => console.log(data.toString()));
    stream.on('close', () => conn.end());
  });
}).connect({
  host: '206.183.128.89',
  port: 22,
  username: 'root',
  password: 'L6R09XgL'
});