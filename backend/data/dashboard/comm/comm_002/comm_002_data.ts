import { db } from "../../../../nodeMysql/database";
import { PostComm_002_01, PostComm_002_02, GetComm_002_01, GetComm_002_02, GetCnt } from "../../../../model/dashboard/comm/comm_002/comm_002_mdl";


export async function search01(): Promise<Array<GetComm_002_01>> {
  const query: string =
    `select row_number() over (order by top_menu_id desc) as row_id, 
          top_menu_id,
          top_menu_nm,
          sort,
          insert_id,
          insert_date,
          update_id,
          update_date
      from comm.top_menus
      order by sort`;
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  return db.execute(query).then((result: any) => result[0]);
}

export async function search02(searchInfo: PostComm_002_01): Promise<Array<GetComm_002_01>> {
  const { top_menu_id } = searchInfo;
  const query: string =
    `select row_number() over (order by top_menu_id, menu_id desc) as row_id,
            top_menu_id,
            '' as top_menu_nm,
            menu_id,
            menu_nm,
            href,
            sort,
            insert_id,
            insert_date,
            update_id,
            update_date
     from menus
     where top_menu_id = ?
     order by sort`;
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query, [top_menu_id]);
  return db.execute(query, [top_menu_id]).then((result: any) => result[0]);
}


// insert 전에 동일 메뉴 체크
export async function checkPk01(menuInfo: PostComm_002_01): Promise<Array<GetCnt>> {
  const { top_menu_id } = menuInfo;
  const query: string =
    "select count(*) as cnt from comm.top_menus where top_menu_id = ? order by sort";
  return db.execute(query, [top_menu_id]).then((result: any) => result[0]);
}


// insert 전에 동일 메뉴 체크
export async function checkPk02(menuInfo: PostComm_002_02): Promise<Array<GetCnt>> {
  const { top_menu_id, menu_id } = menuInfo;
  const query: string =
    "select count(*) as cnt from menus where top_menu_id = ? and menu_id = ? order by sort";
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);  
  return db.execute(query, [top_menu_id, menu_id]).then((result: any) => result[0]);
}


export async function insert01(insertInfo: PostComm_002_01): Promise<string> {
  const {
    top_menu_id,
    top_menu_nm,
    sort,
  } = insertInfo;

  console.log("insertInfo ::" , insertInfo);

  const query: string =
    "insert into comm.top_menus (top_menu_id, top_menu_nm, sort, insert_date) VALUES (?, ?, ?, NOW())";
  return db
    .execute(query, [
      top_menu_id,
      top_menu_nm,
      sort
    ])
    .then((result: any) => result[0].insertId);
}


export async function insert02(insertInfo: PostComm_002_02): Promise<string> {
  const {
    top_menu_id,
    menu_id,
    menu_nm,
    href,
    sort,
  } = insertInfo;

  console.log("userInfo ::" , insertInfo);

  const query: string =
    "insert into comm.menus (top_menu_id, menu_id, menu_nm, href, sort,  insert_date) VALUES (?, ?, ?, ?, ?, NOW())";
  return db
    .execute(query, [
      top_menu_id,
      menu_id,
      menu_nm,
      href,
      sort,
    ])
    .then((result: any) => result[0].insertId);
}



export async function update01(updateInfo: PostComm_002_01): Promise<number> {

  const param = Array.isArray(updateInfo) ? updateInfo[0] : updateInfo;

  const {
    top_menu_id,
    top_menu_nm,
    sort,
    update_id,
  } = param;

  const query: string = `
    update comm.top_menus set
      top_menu_nm = ?
      ,sort = ?
      
      ,update_date = NOW()
    where top_menu_id = ?
  `;

  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', updateInfo);

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      top_menu_nm,
      sort,
      
      top_menu_id
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}


export async function update02(updateInfo: PostComm_002_02): Promise<number> {

  const param = Array.isArray(updateInfo) ? updateInfo[0] : updateInfo;

  const {
    top_menu_id,
    menu_id,
    menu_nm,
    href,
    sort,
    update_id,
  } = param;

  const query: string = `
    update comm.menus set
      menu_nm = ?
      ,href = ?
      ,sort = ?
      ,update_date = NOW()
    where top_menu_id = ?
      and menu_id = ?
  `;

  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', updateInfo);

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      menu_nm,
      href,
      sort,
      top_menu_id,
      menu_id,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating menu:", error);
    throw new Error("Failed to update menu");
  }
}

export async function delete01(deleteInfo: PostComm_002_01): Promise<string> {
  const { top_menu_id } = deleteInfo;

  const query: string =
    "delete from comm.top_menus WHERE top_menu_id = ?";
  return db
    .execute(query, [
      top_menu_id
    ])
    .then((result: any) => result[0].deleteId);
}


export async function delete02(deleteInfo: PostComm_002_02): Promise<string> {
  const { top_menu_id, menu_id } = deleteInfo;

  const query: string =
    "delete from comm.menus WHERE top_menu_id = ? and menu_id = ?";
  return db
    .execute(query, [
      top_menu_id,
      menu_id,
    ])
    .then((result: any) => result[0].deleteId);
}