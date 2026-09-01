const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://user:password@portal-imobiliario-db-1:5432/property_db'
});
client.connect()
  .then(() => {
    console.log('Connected successfully!');
    client.end();
  })
  .catch(err => {
    console.error('Connection failed:', err);
    process.exit(1);
  });