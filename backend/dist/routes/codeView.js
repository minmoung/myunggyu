"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeviewController = __importStar(require("../controller/codeview"));
const router = express_1.default.Router();
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
router.post("/api/code/update", (req, res) => {
    codeviewController.updateCode(req, res)
        .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
        .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
});
router.post("/api/code/delete", (req, res) => {
    codeviewController.deleteCode(req, res)
        .then(result => {
        // 성공적인 응답 처리
        res.status(200).json(result);
    })
        .catch(error => {
        // 에러 발생 시 응답
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.', error: error.toString() });
    });
});
exports.default = router;
