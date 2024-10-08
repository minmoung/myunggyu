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
exports.searchMenu = searchMenu;
exports.saveMenu = saveMenu;
exports.deleteMenu = deleteMenu;
exports.searchTopMenu = searchTopMenu;
exports.saveTopMenu = saveTopMenu;
exports.deleteTopMenu = deleteTopMenu;
const menuViewData = __importStar(require("../data/menuview"));
// 모든 admin user 들을 배열로 전송하도록 설계
function searchMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInfo = yield menuViewData.searchMenu();
        res.send(searchInfo);
    });
}
// Save
function saveMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        console.log("saveInfo.tran_gb : ", saveInfo.tran_gb);
        let saveId;
        let userCnt;
        try {
            if (saveInfo.tran_gb == "insert") {
                userCnt = yield menuViewData.checkMenu(saveInfo);
                console.log("userCnt :", userCnt);
                if (userCnt[0].cnt < 1) {
                    saveId = yield menuViewData.insertMenu(saveInfo);
                }
                else {
                    return res.status(201).json({ message: "중복된 메뉴가 존재합니다.\n(" + saveInfo.menu_id + " : " + saveInfo.menu_nm + ")" });
                }
            }
            else {
                saveId = yield menuViewData.updateMenu(saveInfo);
            }
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save menu data" });
        }
        // res.status(201).json({ saveId: saveId });
    });
}
// Delete
function deleteMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteInfo = req.body;
        const deleteId = yield menuViewData.deleteMenu(deleteInfo);
        res.status(201).json({ deleteId: deleteId });
    });
}
// 모든 admin user 들을 배열로 전송하도록 설계
function searchTopMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchInfo = yield menuViewData.searchTopMenu();
        res.send(searchInfo);
    });
}
// Save
function saveTopMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveInfo = req.body;
        console.log("saveInfo.tran_gb : ", saveInfo.tran_gb);
        let saveId;
        let menuTopCnt;
        try {
            if (saveInfo.tran_gb == "insert") {
                menuTopCnt = yield menuViewData.checkMenuTop(saveInfo);
                if (menuTopCnt[0].cnt < 1) {
                    saveId = yield menuViewData.insertTopMenu(saveInfo);
                }
                else {
                    return res.status(201).json({ message: "중복된 메뉴가 존재합니다.\n(" + saveInfo.top_menu_id + " : " + saveInfo.top_menu_nm + ")" });
                }
            }
            else {
                saveId = yield menuViewData.updateTopMenu(saveInfo);
            }
            // 정상적으로 saveId를 얻으면 클라이언트에 응답
            return res.status(201).json({ saveId });
        }
        catch (error) {
            console.error("Error during user save operation:", error);
            // 오류 발생 시 응답을 보낸 후 함수 종료
            return res.status(500).json({ message: "Failed to save menu data" });
        }
        // res.status(201).json({ saveId: saveId });
    });
}
// Delete
function deleteTopMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteInfo = req.body;
        const deleteId = yield menuViewData.deleteTopMenu(deleteInfo);
        res.status(201).json({ deleteId: deleteId });
    });
}
