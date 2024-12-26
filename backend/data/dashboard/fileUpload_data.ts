import { db } from "../../nodeMysql/database";
import { PostFile, GetFile } from "../../model/dashboard/fileUpload_mdl";
import { PostTopMenu } from "../../model/menuView";


export async function searchFile(fileId: PostFile): Promise<Array<GetFile>> {
  const { file_id } = fileId;
  const query: string =
    `select file_id, file_seq, file_name, file_size,  file_path, sevr_file_name, use_yn 
      from comm.files where file_id = ? 
      order by sort`;
    // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
    console.log('Executing SQL:', query);
    console.log('With Parameters:', file_id);
  return db.execute(query, [file_id]).then((result: any) => result[0]);
}


export async function insertFile(fileInfo: PostFile): Promise<string> {
  const {
    file_id,
    file_seq,
    file_name,
    file_size,
    file_path,
    sevr_file_name,
    use_yn
  } = fileInfo;

  const query: string =
    `insert into files (
        file_id, 
        file_seq,
        file_name,
        file_size,
        file_path,
        sevr_file_name,
        use_yn,
        insert_date) 
    values (
        (select coalesce(MAX(file_id), 0) + 1 AS next_file_id
           from comm.files),
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        NOW()
    )`;
  return db
    .execute(query, [
        file_seq,
        file_name,
        file_size,
        file_path,
        sevr_file_name,
        use_yn
    ])
    .then((result: any) => result[0].updateId);
}