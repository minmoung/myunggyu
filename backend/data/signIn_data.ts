import { db } from "../nodeMysql/database";
import { PostSign, GetSign } from "../model/signIn_mdl";



  export async function searchSign(searchInfo : PostSign): Promise<Array<GetSign>> {
  const { user_id, pwd } = searchInfo;
  const query: string =
    `select a.user_id
            , a.user_name
            , (case when a.pwd = ? then 'Y' else 'N' end) as pwdCk
            , a.email
            , a.phone_no
            , a.file_id
            , b.sevr_file_name as file_path 
            , a.created_at
        from comm.users a
        left join comm.files b
        on a.file_id = b.file_id
        where a.user_id = ? `;
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

