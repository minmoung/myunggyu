import express, { request } from "express";
import * as codeviewController from "../controller/codeview";

const router = express.Router();

router.post("/api/code/upCodeSearch", codeviewController.searchUpCode);
router.post("/api/code/upCodeInsert", (req, res) => {

    codeviewController.insertUpCode(req, res) 
    .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
    .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
  });

router.post("/api/code/upCodeUpdate", (req, res) => {
    
    codeviewController.updateUpCode(req, res) 
    .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
    .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
  });

router.post("/api/code/upCodeDelete", (req, res) => {
    
    codeviewController.deleteUpCode(req, res) 
    .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
    .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
  });
  

router.post("/api/code/search", (req, res) => {

    codeviewController.searchCode(req, res) 
    .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
    .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
  });


router.post("/api/code/insert", (req, res) => {

    codeviewController.insertCode(req, res) 
    .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
    .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
  });
    
    
router.post("/api/code/update", codeviewController.updateCode);
router.post("/api/code/delete", codeviewController.deleteCode);

export default router;