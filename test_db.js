const { execSync } = require('child_process');

try {
  // Test connection to postgres container
  const result = execSync('pg_isready -h localhost -p 5432').toString();
  console.log('Database Status: Connected', result);
} catch (e) {
  console.error('Database Status: Connection Failed', e.message);
}
