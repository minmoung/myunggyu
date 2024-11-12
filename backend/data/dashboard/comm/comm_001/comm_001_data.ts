import { db } from "../../../../nodeMysql/database";
import { PostComm_001, GetComm_001, GetCnt } from "../../../../model/dashboard/comm/comm_001/comm_001_mdl";


export async function searchUser(): Promise<Array<GetComm_001>> {
  const query: string =
    "select row_number() over (order by user_id desc) as row_id, user_id, user_name as user_nm, email, phone_no, pwd from users";
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  return db.execute(query).then((result: any) => result[0]);
}


// insert 전에 동일 사용자 체크
export async function checkUser(userInfo: PostComm_001): Promise<Array<GetCnt>> {
  const { user_id } = userInfo;
  const query: string =
    "select count(*) as cnt from users where user_id = ?";
  return db.execute(query, [user_id]).then((result: any) => result[0]);
}


export async function insertUser(userInfo: PostComm_001): Promise<string> {
  const {
    user_id,
    user_nm,
    // sex,
    phone_no,
    email,
    pwd,
  } = userInfo;

  console.log("userInfo ::" , userInfo);

  const query: string =
    // "INSERT INTO tb_admin VALUES(2,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())";
    "INSERT INTO users (user_id, user_name, email, phone_no, pwd) VALUES (?, ?, ?, ?, ?)";
  return db
    .execute(query, [
      user_id,
      user_nm,
      // sex,
      phone_no,
      email,
      pwd,
    ])
    .then((result: any) => result[0].insertId);
}


export async function updateUser(userInfo: PostComm_001): Promise<number> {

  const user = Array.isArray(userInfo) ? userInfo[0] : userInfo;

  const {
    user_id,
    user_nm,
    // sex,
    phone_no,
    email,
    pwd,
  } = user;

  const query: string = `
    update users set
      user_name = ?
      ,phone_no = ?
      ,email = ?
      ,pwd = ?
    where user_id = ?
  `;

  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', userInfo);

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
      user_nm,
      // sex,
      phone_no,
      email,
      pwd,
      user_id,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(userInfo: PostComm_001): Promise<string> {
  const { user_id } = userInfo;

  const query: string =
    "DELETE FROM users WHERE user_id = ?";
  return db
    .execute(query, [
      user_id
    ])
    .then((result: any) => result[0].insertId);
}