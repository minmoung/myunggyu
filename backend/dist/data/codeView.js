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
exports.searchUpCode = searchUpCode;
exports.checkUpCode = checkUpCode;
exports.insertUpCode = insertUpCode;
exports.updateUpCode = updateUpCode;
exports.deleteUpCode = deleteUpCode;
exports.searchCode = searchCode;
exports.checkCode = checkCode;
exports.insertCode = insertCode;
exports.updateCode = updateCode;
exports.deleteCode = deleteCode;
const database_1 = require("../nodeMysql/database");
function searchUpCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select up_code_cd, up_code_nm, sort from up_codes";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 code 체크
function checkUpCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd } = codeInfo;
        const query = "select count(*) as cnt from up_codes where up_code_cd = ?";
        return database_1.db.execute(query, [up_code_cd]).then((result) => result[0]);
    });
}
function insertUpCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd, up_code_nm, sort, } = codeInfo;
        const query = "insert into up_codes (up_code_cd, up_code_nm, sort, insert_id, insert_date) values (?, ?, ?, ?, NOW())";
        return database_1.db
            .execute(query, [
            up_code_cd,
            up_code_nm,
            sort,
        ])
            .then((result) => result[0].updateId);
    });
}
function updateUpCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd, up_code_nm, sort, update_id, } = codeInfo;
        const query = `
    update users set
      up_code_cd = ?
      up_code_nm = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where up_code_cd = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                up_code_cd,
                up_code_nm,
                sort,
                update_id,
            ]);
            // 업데이트된 행의 수를 반환
            return result.affectedRows;
        }
        catch (error) {
            // 오류 처리
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    });
}
function deleteUpCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd } = codeInfo;
        const query = "delete from up_codes where up_code_cd = ?";
        return database_1.db
            .execute(query, [
            up_code_cd,
        ])
            .then((result) => result[0].insertId);
    });
}
function searchCode() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select code_cd, code_nm, up_code_cd, sort from codes";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 code 체크
function checkCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd, code_cd } = codeInfo;
        const query = "select count(*) as cnt from codes where up_code_cd = ? and code_cd = ?";
        return database_1.db.execute(query, [up_code_cd, code_cd]).then((result) => result[0]);
    });
}
function insertCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code_cd, code_nm, up_code_cd, sort, } = codeInfo;
        const query = "insert into codes (code_cd, code_nm, up_code_cd, sort, insert_id, insert_date) values (?, ?, ?, ?, ?, NOW())";
        return database_1.db
            .execute(query, [
            code_cd,
            code_nm,
            up_code_cd,
            sort,
        ])
            .then((result) => result[0].updateId);
    });
}
function updateCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { code_cd, code_nm, up_code_cd, sort, update_id, } = codeInfo;
        const query = `
    update users set
      up_code_cd = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where up_code_cd = ?
      and code_cd = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                code_cd,
                code_nm,
                up_code_cd,
                sort,
                update_id,
            ]);
            // 업데이트된 행의 수를 반환
            return result.affectedRows;
        }
        catch (error) {
            // 오류 처리
            console.error("Error updating user:", error);
            throw new Error("Failed to update user");
        }
    });
}
function deleteCode(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { up_code_cd, code_cd } = codeInfo;
        const query = "delete from codes where up_code_cd = ? and code_cd = ?";
        return database_1.db
            .execute(query, [
            up_code_cd,
            code_cd
        ])
            .then((result) => result[0].insertId);
    });
}
