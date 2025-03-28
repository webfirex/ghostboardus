import { Pool } from 'pg';

const pool = new Pool({
  user: 'ghostadmin',
  host: '64.23.149.214',
  database: 'ghostboarddb',
  password: 'cferw777',
  port: 5432,
});

export default pool;