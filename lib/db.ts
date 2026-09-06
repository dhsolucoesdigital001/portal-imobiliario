import { Pool } from 'pg';

// Share the connection pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
