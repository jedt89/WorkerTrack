import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


try {
  await pool.query('SELECT NOW()');
  console.log('Base de datos conectada');
} catch (error) {
  console.log(error);
}

export default pool;
