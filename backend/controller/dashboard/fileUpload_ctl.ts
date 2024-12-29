import { Request, RequestHandler, Response } from "express";
import { PostFile, GetFile } from "../../model/dashboard/fileUpload_mdl";
import * as fileUpload_data from "../../data/dashboard/fileUpload_data";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // .env 파일 로드

// 업로드 폴더 경로를 현재파일 기준으로 설정
// const uploadDir = path.join(__dirname, "uploads");
// 업로드 폴더 경로를 프로젝트 루트 기준으로 설정
// const uploadDir = path.join(process.cwd(), "uploads");
// 루트 경로를 환경 변수에서 가져오기
const rootPath = process.env.ROOT_PATH || process.cwd();
const uploadDir = path.join(rootPath, "uploads");

// 폴더 생성 함수
const ensureUploadsFolderExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Folder created: ${uploadDir}`);
  }
};

// 파일 정보를 관리할 Map 생성
const fileMetadata = new Map<string, string>();

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // 업로드 폴더 확인 및 생성
      ensureUploadsFolderExists();
      cb(null, "uploads/"); // 파일 저장 경로
    },
    filename: (req, file, cb) => {
      const utf8Name = Buffer.from(file.originalname, "latin1").toString("utf8");  // 한글 깨짐 방지
      file.originalname = utf8Name; 
      console.log("utf8Name   ::", utf8Name);
      const sevrFileName = `${Date.now()}-${file.originalname}`;
      const uniqueName = sevrFileName;

      fileMetadata.set("sevrFileName", sevrFileName);
      // (file as any).sevrFileName = sevrFileName; // 타입 단언을 사용해 추가 속성 설정
      cb(null, uniqueName); // 파일 이름 지정
    },
  });


// multer 인스턴스 생성 (단일건)
// const upload = multer({ storage }).single("files");
const upload = multer({ 
  storage, 
  // limits: { fileSize: 10 * 1024 * 1024 } // 최대 10MB
  limits: { fileSize: 1024 * 1024 * 1024 } // 최대 1GB
}).array("files", 10); // 최대 10개의 파일 처리

// 파일 업로드 컨트롤러
export const fileUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    // multer로 파일 처리
    await new Promise<void>((resolve, reject) => {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          reject({ message: "Multer error", error: err.message });
        }
        if (err) {
          reject({ message: "File upload error", error: err.message });
        }
        resolve(); // 업로드 완료
      });
    });

    if (!req.files) {
      res.status(400).json({ message: "No file uploaded" });
    }

    // 업로드된 파일 정보 처리 (멀티건)
    const filesInfo = (req.files as Express.Multer.File[]).map((file) => ({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.path,
    }));

    console.log("Uploaded files:", filesInfo.map(file => ({
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
    })));

    // const fileParam: PostFile = filesInfo;
    // PostFile 타입에 맞게 매핑
    const fileParams: PostFile[] = filesInfo.map((file, index) => ({
        file_id: '', // 고유 ID를 생성 (예: 파일 순서로 ID 생성)
        file_seq: `${index + 1}`,     // 파일 순번
        file_name: file.originalName, // 파일 이름
        file_size: file.size.toString(), // 파일 크기를 문자열로 변환
        file_path: '',
        sevr_file_name: fileMetadata.get("sevrFileName") || file.originalName,
        use_yn: '1',
    }));

    const fileId = await fileUpload_data.selectFileId();
    let saveFiles: any[] = [];

    for (const fileParam of fileParams) {

      console.log("fileId   :: " , fileId);

      const param = {
        ...fileParam,
        file_id: fileId[0].file_id,
      };
      
      const fileInfoSelect:PostFile = await fileUpload_data.insertFile(param);
      saveFiles.push(fileInfoSelect);
            
      // if (userCnt[0].cnt < 1) {
      // const saveId = await codeViewData.insertUpCode(saveInfo);
      // saveIds.push(saveId);
      // } else {
      // duplicateInfos.push(saveInfo); // 중복된 데이터 저장
      // }
    }

    console.log("saveFiles  :: " , saveFiles);
    // 파일 정보 검색 비동기 호출
    // const fileInfoSelect: Array<GetFile> = await fileUpload_data.insertFile(fileParam);

    // 클라이언트에 파일 정보 응답
    res.status(200).json({
      message: "File uploaded successfully!",
      file: filesInfo,
      fileInfo: saveFiles,
    });
    
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: (error as Error).message });
  }
};


// 파일 업로드 컨트롤러
export const fileUpload_back = async (req: Request, res: Response) => {

  // multer로 파일 처리
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error", error: err.message });
    }
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 업로드된 파일 정보 (단건)
    // const fileInfo = {
    //   originalName: req.file.originalname,
    //   mimeType: req.file.mimetype,
    //   size: req.file.size,
    //   path: req.file.path,
    // };

    // console.log("Uploaded file:", fileInfo);

    if (req.files) {
      // 업로드된 파일 정보 처리 (멀티건)
      const filesInfo = (req.files as Express.Multer.File[]).map((file) => ({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
      }));

      // console.log("Uploaded files:", filesInfo);
      console.log("Uploaded files:", filesInfo.map(file => ({
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
      })));


      // const fileParam: PostFile = req.body;
      // try {
      //   const fileInfo: Array<GetFile> = await fileUpload_data.searchFile(fileParam);
      //   res.send(fileInfo);
      // } catch (error) {
      //   console.error("Error occurred:", error);
      //   res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.' });
      // }


      // 클라이언트에 파일 정보 응답
      res.status(200).json({
        message: "File uploaded successfully!",
        file: filesInfo,
      });
    }

  });
};