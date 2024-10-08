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
exports.searchUpCode = searchUpCode;
exports.insertUpCode = insertUpCode;
exports.updateUpCode = updateUpCode;
exports.deleteUpCode = deleteUpCode;
exports.searchCode = searchCode;
exports.insertCode = insertCode;
exports.updateCode = updateCode;
exports.deleteCode = deleteCode;
const codeViewData = __importStar(require("../data/codeView"));
// 모든 상위코드를 배열로 전송하도록 설계
function searchUpCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInfo = yield codeViewData.searchUpCode();
        res.send(searchInfo);
    });
}
function insertUpCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        let saveId;
        let userCnt;
        try {
            userCnt = yield codeViewData.checkUpCode(saveInfo);
            console.log("userCnt :", userCnt);
            if (userCnt[0].cnt < 1) {
                saveId = yield codeViewData.insertUpCode(saveInfo);
            }
            else {
                return res.status(201).json({ message: "중복된 코드가 존재합니다.\n(" + saveInfo.up_code_cd + " : " + saveInfo.up_code_nm + ")" });
            }
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save user data" });
        }
    });
}
function updateUpCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        let saveId;
        let userCnt;
        try {
            saveId = yield codeViewData.updateUpCode(saveInfo);
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save user data" });
        }
    });
}
// Delete
function deleteUpCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteInfo = req.body;
        const deleteId = yield codeViewData.deleteUpCode(deleteInfo);
        res.status(201).json({ deleteId: deleteId });
    });
}
// 모든 코드를 배열로 전송하도록 설계
function searchCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInfo = yield codeViewData.searchCode();
        res.send(searchInfo);
    });
}
function insertCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        let saveId;
        let userCnt;
        try {
            userCnt = yield codeViewData.checkCode(saveInfo);
            console.log("userCnt :", userCnt);
            if (userCnt[0].cnt < 1) {
                saveId = yield codeViewData.insertCode(saveInfo);
            }
            else {
                return res.status(201).json({ message: "중복된 코드가 존재합니다.\n(" + saveInfo.code_cd + " : " + saveInfo.code_nm + ")" });
            }
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save user data" });
        }
    });
}
function updateCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        let saveId;
        let userCnt;
        try {
            saveId = yield codeViewData.updateCode(saveInfo);
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save user data" });
        }
    });
}
// Delete
function deleteCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteInfo = req.body;
        const deleteId = yield codeViewData.deleteCode(deleteInfo);
        res.status(201).json({ deleteId: deleteId });
    });
}
