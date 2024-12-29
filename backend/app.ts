// app.ts (메인 서버 파일)
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
// CORS 설정 적용
app.use(cors());
// 미들웨어 설정
app.use(express.json());
// 정적 파일 경로 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const routesDirectory = path.join(__dirname, 'routes');

// 디렉토리 내 모든 라우터 파일을 재귀적으로 불러오는 함수
function loadRoutes(directory: string) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    
    if (fs.lstatSync(filePath).isDirectory()) {
      // 디렉터리 내 파일을 재귀적으로 탐색
      loadRoutes(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      // 라우터 파일 불러오기 (default export 라우터)
      const route = require(filePath).default;
      app.use('/', route); // 모든 라우터를 '/'에 연결
    }
  });
}

// 동적으로 routes 디렉터리 내의 모든 라우터 파일을 로드
// fs.readdirSync(routesDirectory).forEach((file) => {
//   const filePath = path.join(routesDirectory, file);
  
//   // 파일이 디렉터리인지 확인
//   if (fs.lstatSync(filePath).isDirectory()) {
//     // 디렉터리 내 파일도 재귀적으로 탐색
//     fs.readdirSync(filePath).forEach((nestedFile) => {
//       const nestedFilePath = path.join(filePath, nestedFile);
//       const route = require(nestedFilePath).default; // default export를 사용한 경우
//       app.use('/', route);
//     });
//   } else {
//     // 라우터 파일 로드
//     const route = require(filePath).default; // default export를 사용한 경우
//     app.use('/', route);
//   }
// });

// app에 라우터 연결
// app.use('/', router); // adminRoutes를 사용하여 라우팅 설정
// `routes` 디렉토리의 모든 라우터 파일 로드
loadRoutes(routesDirectory);

// 포트 설정 및 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});