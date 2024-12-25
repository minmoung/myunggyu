import { Request, Response } from "express";
import multer from "multer";
import path from "path";


// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // 파일 저장 경로
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName); // 파일 이름 지정
    },
  });


// multer 인스턴스 생성
const upload = multer({ storage }).single("file");

// 파일 업로드 컨트롤러
export const fileUpload = async (req: Request, res: Response) => {
  // multer로 파일 처리
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 업로드된 파일 정보
    const fileInfo = {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    };

    console.log("Uploaded file:", fileInfo);

    // 클라이언트에 파일 정보 응답
    res.status(200).json({
      message: "File uploaded successfully!",
      file: fileInfo,
    });
  });
};