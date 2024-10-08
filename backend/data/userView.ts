import { db } from "../nodeMysql/database";
import { PostAdmin, GetAdmin, GetCnt } from "../model/userView";


export async function searchUser(): Promise<Array<GetAdmin>> {
  const query: string =
    "select user_id, user_name as user_nm, email, phone_no, pwd from users";
  return db.execute(query).then((result: any) => result[0]);
}


// insert 전에 동일 사용자 체크
export async function checkUser(userInfo: PostAdmin): Promise<Array<GetCnt>> {
  const { user_id } = userInfo;
  const query: string =
    "select count(*) as cnt from users where user_id = ?";
  return db.execute(query, [user_id]).then((result: any) => result[0]);
}


export async function insertUser(userInfo: PostAdmin): Promise<string> {
  const {
    user_id,
    user_nm,
    // sex,
    phone_no,
    email,
    pwd,
  } = userInfo;

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

export async function updateUser(userInfo: PostAdmin): Promise<number> {
  const {
    user_id,
    user_nm,
    // sex,
    phone_no,
    email,
    pwd,
  } = userInfo;

  const query: string = `
    update users set
      user_name = ?
      ,phone_no = ?
      ,email = ?
      ,pwd = ?
    where user_id = ?
  `;

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

export async function deleteUser(userInfo: PostAdmin): Promise<string> {
  const { user_id } = userInfo;

  const query: string =
    "DELETE FROM users WHERE user_id = ?";
  return db
    .execute(query, [
      user_id
    ])
    .then((result: any) => result[0].insertId);
}