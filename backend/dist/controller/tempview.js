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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTemp = searchTemp;
exports.insertTemp = insertTemp;
exports.updateTemp = updateTemp;
exports.deleteTemp = deleteTemp;
const tempData = __importStar(require("../data/tempData"));
// 모든 admin user 들을 배열로 전송하도록 설계
function searchTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInfo = yield tempData.searchRow();
        res.send(searchInfo);
    });
}
function insertTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfos = req.body; // 여러 행을 배열로 받음
        let saveIds = [];
        let duplicateInfos = []; // 중복된 코드 정보를 저장할 배열
        try {
            for (const saveInfo of saveInfos) {
                console.log("===== selectCnt =====");
                const userCnt = yield tempData.checkRow(saveInfo);
                console.log("userCnt :", userCnt);
                if (userCnt[0].cnt < 1) {
                    const saveId = yield tempData.insertRow(saveInfo);
                    saveIds.push(saveId);
                }
                else {
                    duplicateInfos.push(saveInfo); // 중복된 데이터 저장
                }
            }
            if (duplicateInfos.length > 0) {
                // 중복된 데이터가 있을 경우
                res.status(201).json({
                    success: false,
                    message: `중복된 코드가 존재합니다.`,
                    duplicates: duplicateInfos.map((info) => `(${info.col1} : ${info.col1})`),
                });
            }
            // 모든 데이터를 성공적으로 저장한 후 응답
            res.status(201).json({ success: true, saveIds });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            res.status(500).json({ success: false, message: "Failed to save user data" });
        }
    });
}
function updateTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfos = req.body;
        let saveIds = [];
        try {
            for (const saveInfo of saveInfos) {
                const saveId = yield tempData.updateRow(saveInfo);
                saveIds.push(saveId);
            }
            // 모든 데이터를 성공적으로 저장한 후 응답
            res.status(201).json({ success: true, saveIds });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            res.status(500).json({ success: false, message: "Failed to update user" });
        }
    });
}
// Delete
function deleteTemp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteInfo = req.body;
        const deleteId = yield tempData.deleteRow(deleteInfo);
        res.status(201).json({ deleteId: deleteId });
    });
}
