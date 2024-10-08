"use strict";
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
exports.createAdmin = createAdmin;
exports.getAdmin = getAdmin;
const database_1 = require("../nodeMysql/database");
function createAdmin(newAdminInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { adlvno, adid, adpw, adname, adress, findpass_que, findpass_ans, email, tel, depart, duty, } = newAdminInfo;
        const query = "INSERT INTO tb_admin VALUES(2,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
        return database_1.db
            .execute(query, [
            adlvno,
            adid,
            adpw,
            adname,
            adress,
            findpass_que,
            findpass_ans,
            email,
            tel,
            depart,
            duty,
        ])
            .then((result) => result[0].insertId);
    });
}
function getAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT user_id, user_name as user_nm, email, phone_no, pwd FROM users";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
