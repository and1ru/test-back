import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'mydb',
  waitForConnections: true,
  connectionLimit: 10, // máximo de conexiones simultáneas
  queueLimit: 0
});

export const pooltest = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10, // máximo de conexiones simultáneas
  queueLimit: 0
})