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
exports.searchMenu = searchMenu;
exports.checkMenu = checkMenu;
exports.insertMenu = insertMenu;
exports.updateMenu = updateMenu;
exports.deleteMenu = deleteMenu;
exports.searchTopMenu = searchTopMenu;
exports.checkMenuTop = checkMenuTop;
exports.insertTopMenu = insertTopMenu;
exports.updateTopMenu = updateTopMenu;
exports.deleteTopMenu = deleteTopMenu;
const database_1 = require("../nodeMysql/database");
function searchMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select menu_id, menu_nm, sort, insert_id, insert_date, update_id, update_date from menus";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 메뉴 체크
function checkMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { menu_id } = menuInfo;
        const query = "select count(*) as cnt from menus where menu_id = ?";
        return database_1.db.execute(query, [menu_id]).then((result) => result[0]);
    });
}
function insertMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { menu_id, menu_nm, sort, insert_id, insert_date, } = menuInfo;
        const query = "insert into menus (menu_id, menu_nm, sort, insert_id, insert_date) VALUES (?, ?, ?, ?, NOW())";
        return database_1.db
            .execute(query, [
            menu_id,
            menu_nm,
            sort,
            insert_id,
        ])
            .then((result) => result[0].insertId);
    });
}
function updateMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { menu_id, menu_nm, sort, update_id, } = menuInfo;
        const query = `
    update menus set
      menu_nm = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where menu_id = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                menu_nm,
                // sex,
                sort,
                update_id,
                menu_id,
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
function deleteMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { menu_id } = menuInfo;
        const query = "delete from menus where menu_id = ?";
        return database_1.db
            .execute(query, [
            menu_id
        ])
            .then((result) => result[0].insertId);
    });
}
function searchTopMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "select top_menu_id, top_menu_nm, sort, insert_id, insert_date, update_id, update_date from top_menus";
        return database_1.db.execute(query).then((result) => result[0]);
    });
}
// insert 전에 동일 메뉴 체크
function checkMenuTop(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { top_menu_id } = menuInfo;
        const query = "select count(*) as cnt from top_menus where top_menu_id = ?";
        return database_1.db.execute(query, [top_menu_id]).then((result) => result[0]);
    });
}
function insertTopMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { top_menu_id, top_menu_nm, sort, insert_id, insert_date, } = menuInfo;
        const query = "insert into top_menus (top_menu_id, top_menu_nm, sort, insert_id, insert_date) VALUES (?, ?, ?, ?, NOW())";
        return database_1.db
            .execute(query, [
            top_menu_id,
            top_menu_nm,
            sort,
            insert_id,
        ])
            .then((result) => result[0].insertId);
    });
}
function updateTopMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { top_menu_id, top_menu_nm, sort, update_id, } = menuInfo;
        const query = `
    update top_menus set
      top_menu_nm = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where top_menu_id = ?
  `;
        try {
            // 데이터베이스 쿼리 실행
            const [result] = yield database_1.db.execute(query, [
                top_menu_nm,
                // sex,
                sort,
                update_id,
                top_menu_id,
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
function deleteTopMenu(menuInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { top_menu_id } = menuInfo;
        const query = "delete from top_menus where top_menu_id = ?";
        return database_1.db
            .execute(query, [
            top_menu_id
        ])
            .then((result) => result[0].insertId);
    });
}
