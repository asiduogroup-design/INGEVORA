import mysql from 'mysql2/promise'
import { env } from './environment.js'

export const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function verifyDatabaseConnection() {
  const connection = await pool.getConnection()
  try {
    await connection.ping()
    console.log('MySQL connection verified')
  } finally {
    connection.release()
  }
}
