"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// .env 파일 로드
dotenv_1.default.config();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST, // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASSWORD, // mysql password
    database: process.env.DB_DATABASE, // mysql 데이터베이스
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.db = pool;
