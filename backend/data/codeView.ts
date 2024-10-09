import { db } from "../nodeMysql/database";
import { PostUpCode, GetUpCode, PostCode, GetCode, GetCnt } from "../model/codeView";

export async function searchUpCode(): Promise<Array<GetUpCode>> {
  const query: string =
    "select row_number() over (order by a.up_code_cd desc) as row_id, up_code_cd, up_code_nm, sort from up_codes a";
  return db.execute(query).then((result: any) => result[0]);
}

// insert 전에 동일 code 체크
export async function checkUpCode(codeInfo: PostUpCode): Promise<Array<GetCnt>> {
  console.log('codeInfo  ::', codeInfo);
  const { up_code_cd } = codeInfo;
  const query: string =
    "select count(*) as cnt from up_codes where up_code_cd = ?";
  return db.execute(query, [up_code_cd]).then((result: any) => result[0]);
}

export async function insertUpCode(codeInfo: PostUpCode): Promise<string> {
  const {
    up_code_cd,
    up_code_nm,
    sort,
    
  } = codeInfo;

  const query: string =
    "insert into up_codes (up_code_cd, up_code_nm, sort, insert_date) values (?, ?, ?, NOW())";
  return db
    .execute(query, [
      up_code_cd,
      up_code_nm,
      sort,
      
    ])
    .then((result: any) => result[0].updateId);
}

export async function updateUpCode(codeInfo: PostUpCode): Promise<number> {
  const {
    up_code_cd,
    up_code_nm,
    sort,
    update_id,
  } = codeInfo;

  const query: string = `
    update up_codes set
      up_code_nm = ?
      ,sort = ?
      
      ,update_date = NOW()
    where up_code_cd = ?
  `;

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      up_code_nm,
      sort,
      
      up_code_cd,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating query:", error);
    throw new Error("Failed to update query");
  }
}

export async function deleteUpCode(codeInfo: PostUpCode): Promise<string> {
  const { up_code_cd } = codeInfo;

  const query: string =
    "delete from up_codes where up_code_cd = ?";
  return db
    .execute(query, [
      up_code_cd,
    ])
    .then((result: any) => result[0].insertId);
}


export async function searchCode(searchInfo : GetUpCode[]): Promise<Array<GetCode>> {
  const [{ up_code_cd }] = searchInfo; // 배열에서 첫 번째 객체 추출
  console.log("up_code_cd  ::", up_code_cd);
  const query: string =
    "select row_number() over (order by a.code_cd desc) as row_id, a.code_cd, a.code_nm, a.up_code_cd, a.sort from codes a where a.up_code_cd = ?";
  return db.execute(query, [up_code_cd,]).then((result: any) => result[0]);
}


// insert 전에 동일 code 체크
export async function checkCode(codeInfo: PostCode): Promise<Array<GetCnt>> {
  const { up_code_cd, code_cd } = codeInfo;
  const query: string =
    "select count(*) as cnt from codes where up_code_cd = ? and code_cd = ?";
  return db.execute(query, [up_code_cd, code_cd]).then((result: any) => result[0]);
}


export async function insertCode(codeInfo: PostCode): Promise<string> {
  const {
    code_cd,
    code_nm,
    up_code_cd,
    sort,
  } = codeInfo;

  const query: string =
    "insert into codes (code_cd, code_nm, up_code_cd, sort,  insert_date) values (?, ?, ?, ?, NOW())";
  return db
    .execute(query, [
      code_cd,
      code_nm,
      up_code_cd,
      sort,
    ])
    .then((result: any) => result[0].updateId);
}


export async function updateCode(codeInfo: PostCode): Promise<string> {
  const {
    code_cd,
    code_nm,
    up_code_cd,
    sort,
    update_id,
  } = codeInfo;

  const query: string = `
    update codes set
      code_nm = ?
      ,sort = ?
      ,update_date = NOW()
    where up_code_cd = ?
      and code_cd = ?
  `;

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      code_nm,
      sort,
      up_code_cd,
      code_cd,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating query:", error);
    throw new Error("Failed to update query");
  }
 
}

export async function deleteCode(codeInfo: PostCode): Promise<string> {
  const { up_code_cd, code_cd } = codeInfo;

  const query: string =
    "delete from codes where up_code_cd = ? and code_cd = ?";
  return db
    .execute(query, [
      up_code_cd,
      code_cd
    ])
    .then((result: any) => result[0].insertId);
}