import { db } from "../nodeMysql/database";
import { PostMenu, GetMenu, GetCnt, PostTopMenu, GetTopMenu } from "../model/menuView";


export async function searchMenu(): Promise<Array<GetMenu>> {
  const query: string =
    "select menu_id, menu_nm, sort, insert_id, insert_date, update_id, update_date from menus";
  return db.execute(query).then((result: any) => result[0]);
}


// insert 전에 동일 메뉴 체크
export async function checkMenu(menuInfo: PostMenu): Promise<Array<GetCnt>> {
  const { menu_id } = menuInfo;
  const query: string =
    "select count(*) as cnt from menus where menu_id = ?";
  return db.execute(query, [menu_id]).then((result: any) => result[0]);
}


export async function insertMenu(menuInfo: PostMenu): Promise<string> {
  const {
    menu_id,
    menu_nm,
    sort,
    insert_id,
    insert_date,
  } = menuInfo;

  const query: string =
    "insert into menus (menu_id, menu_nm, sort, insert_id, insert_date) VALUES (?, ?, ?, ?, NOW())";
  return db
    .execute(query, [
      menu_id,
      menu_nm,
      sort,
      insert_id,
    ])
    .then((result: any) => result[0].insertId);
}


export async function updateMenu(menuInfo: PostMenu): Promise<number> {
  const {
    menu_id,
    menu_nm,
    sort,
    update_id,
  } = menuInfo;

  const query: string = `
    update menus set
      menu_nm = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where menu_id = ?
  `;

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      menu_nm,
      // sex,
      sort,
      update_id,
      menu_id,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteMenu(menuInfo: PostMenu): Promise<string> {
  const { menu_id } = menuInfo;

  const query: string =
    "delete from menus where menu_id = ?";
  return db
    .execute(query, [
      menu_id
    ])
    .then((result: any) => result[0].insertId);
}


export async function searchTopMenu(): Promise<Array<GetTopMenu>> {
  const query: string =
    "select top_menu_id, top_menu_nm, sort, insert_id, insert_date, update_id, update_date from top_menus";
  return db.execute(query).then((result: any) => result[0]);
}

// insert 전에 동일 메뉴 체크
export async function checkMenuTop(menuInfo: PostTopMenu): Promise<Array<GetCnt>> {
  const { top_menu_id } = menuInfo;
  const query: string =
    "select count(*) as cnt from top_menus where top_menu_id = ?";
  return db.execute(query, [top_menu_id]).then((result: any) => result[0]);
}

export async function insertTopMenu(menuInfo: PostTopMenu): Promise<string> {
  const {
    top_menu_id,
    top_menu_nm,
    sort,
    insert_id,
    insert_date,
  } = menuInfo;

  const query: string =
    "insert into top_menus (top_menu_id, top_menu_nm, sort, insert_id, insert_date) VALUES (?, ?, ?, ?, NOW())";
  return db
    .execute(query, [
      top_menu_id,
      top_menu_nm,
      sort,
      insert_id,
    ])
    .then((result: any) => result[0].insertId);
}


export async function updateTopMenu(menuInfo: PostTopMenu): Promise<number> {
  const {
    top_menu_id,
    top_menu_nm,
    sort,
    update_id,
  } = menuInfo;

  const query: string = `
    update top_menus set
      top_menu_nm = ?
      ,sort = ?
      ,update_id = ?
      ,update_date = NOW()
    where top_menu_id = ?
  `;

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      top_menu_nm,
      // sex,
      sort,
      update_id,
      top_menu_id,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteTopMenu(menuInfo: PostTopMenu): Promise<string> {
  const { top_menu_id } = menuInfo;

  const query: string =
    "delete from top_menus where top_menu_id = ?";
  return db
    .execute(query, [
      top_menu_id
    ])
    .then((result: any) => result[0].insertId);
}