import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const pool = mysql.createPool(
  {
  host: process.env.DB_HOST, // 호스트 주소
  user: process.env.DB_USER, // mysql user
  password: process.env.DB_PASSWORD, // mysql password
  database: process.env.DB_DATABASE, // mysql 데이터베이스
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = pool;