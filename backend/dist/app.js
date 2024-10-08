"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts (메인 서버 파일)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//import router from './routes/admin';
const app = (0, express_1.default)();
// CORS 설정 적용
app.use((0, cors_1.default)());
// 미들웨어 설정
app.use(express_1.default.json());
const routesDirectory = path_1.default.join(__dirname, 'routes');
// 동적으로 routes 디렉터리 내의 모든 라우터 파일을 로드
fs_1.default.readdirSync(routesDirectory).forEach((file) => {
    const filePath = path_1.default.join(routesDirectory, file);
    // 파일이 디렉터리인지 확인
    if (fs_1.default.lstatSync(filePath).isDirectory()) {
        // 디렉터리 내 파일도 재귀적으로 탐색
        fs_1.default.readdirSync(filePath).forEach((nestedFile) => {
            const nestedFilePath = path_1.default.join(filePath, nestedFile);
            const route = require(nestedFilePath).default; // default export를 사용한 경우
            app.use('/', route);
        });
    }
    else {
        // 라우터 파일 로드
        const route = require(filePath).default; // default export를 사용한 경우
        app.use('/', route);
    }
});
// app에 라우터 연결
// app.use('/', router); // adminRoutes를 사용하여 라우팅 설정
// 포트 설정 및 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
