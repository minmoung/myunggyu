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
exports.searchUser = searchUser;
exports.checkUser = checkUser;
exports.insertUser = insertUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const database_1 = require("../nodeMysql/database");
function searchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select user_id, user_name as user_nm, email, phone_no, pwd from users";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 사용자 체크
function checkUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id } = userInfo;
        const query = "select count(*) as cnt from users where user_id = ?";
        return database_1.db.execute(query, [user_id]).then((result) => result[0]);
    });
}
function insertUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, user_nm, 
        // sex,
        phone_no, email, pwd, } = userInfo;
        const query = 
        // "INSERT INTO tb_admin VALUES(2,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
        "INSERT INTO users (user_id, user_name, email, phone_no, pwd) VALUES (?, ?, ?, ?, ?)";
        return database_1.db
            .execute(query, [
            user_id,
            user_nm,
            // sex,
            phone_no,
            email,
            pwd,
        ])
            .then((result) => result[0].insertId);
    });
}
// export async function updateUser(newAdminInfo: PostAdmin): Promise<string> {
//   const {
//     user_id,
//     user_nm,
//     // sex,
//     phone_no,
//     email,
//     pwd,
//   } = newAdminInfo;
//   const query: string =
//     `update users set
//        user_name = ?
//        ,email  = ?
//        ,phone_no = ?
//        ,pwd  = ?
//      where user_id = ?
//      `;
//   return db
//     .execute(query, [
//       user_nm,
//       // sex,
//       phone_no,
//       email,
//       pwd,
//       user_id,
//     ])
//     .then((result: any) => result[0].updateId);
// }
function updateUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, user_nm, 
        // sex,
        phone_no, email, pwd, } = userInfo;
        const query = `
    update users set
      user_name = ?
      ,phone_no = ?
      ,email = ?
      ,pwd = ?
    where user_id = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                user_nm,
                // sex,
                phone_no,
                email,
                pwd,
                user_id,
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
function deleteUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id } = userInfo;
        const query = "DELETE FROM users WHERE user_id = ?";
        return database_1.db
            .execute(query, [
            user_id
        ])
            .then((result) => result[0].insertId);
    });
}
