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
exports.searchRow = searchRow;
exports.checkRow = checkRow;
exports.insertRow = insertRow;
exports.updateRow = updateRow;
exports.deleteRow = deleteRow;
const database_1 = require("../nodeMysql/database");
function searchRow() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select row_number() over (order by a.col1 desc) as row_id, col1, col2, col3, col4, col5, col6, col7 from temp1 a";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 code 체크
function checkRow(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('codeInfo  ::', codeInfo);
        const { col1 } = codeInfo;
        const query = "select count(*) as cnt from temp1 where col1 = ?";
        return database_1.db.execute(query, [col1]).then((result) => result[0]);
    });
}
function insertRow(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { col1, col2, col3, col4, col5, col6, col7, } = codeInfo;
        const query = "insert into temp1 (col1, col2, col3, col4, col5, col6, col7) values (?, ?, ?, ?, ?, ?, ?)";
        return database_1.db
            .execute(query, [
            col1,
            col2,
            col3,
            col4,
            col5,
            col6,
            col7,
        ])
            .then((result) => result[0].updateId);
    });
}
function updateRow(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { col1, col2, col3, col4, col5, col6, col7, } = codeInfo;
        const query = `
    update temp1 set
      col2 = ?
      ,col3 = ?
      ,col4 = ?
      ,col5 = ?
      ,col6 = ?
      ,col7 = ?
    where col1 = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                col2,
                col3,
                col4,
                col5,
                col6,
                col7,
                col1,
            ]);
            // 업데이트된 행의 수를 반환
            return result.affectedRows;
        }
        catch (error) {
            // 오류 처리
            console.error("Error updating query:", error);
            throw new Error("Failed to update query");
        }
    });
}
function deleteRow(codeInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { col1 } = codeInfo;
        const query = "delete from temp1 where col1 = ?";
        return database_1.db
            .execute(query, [
            col1,
        ])
            .then((result) => result[0].insertId);
    });
}
