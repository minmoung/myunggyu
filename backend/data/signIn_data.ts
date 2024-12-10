import { db } from "../nodeMysql/database";
import { PostSign, GetSign } from "../model/signIn_mdl";



  export async function searchSign(searchInfo : PostSign): Promise<Array<GetSign>> {
  const { user_id, pwd } = searchInfo;
  const query: string =
    `select user_id
            , user_name
            , (case when pwd = ? then 'Y' else 'N' end) as pwdCk
            , email
            , phone_no
            , created_at
        from comm.users 
        where user_id = ? `;
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
    console.log('With Parameters:', searchInfo);
  try {
    return db.execute(query, [pwd, user_id]).then((result: any) => result[0]);
  } catch (error) {
    // 오류 처리
    console.error("Error sign-in user:", error);
    throw new Error("Failed to sign-in");
  }

}

