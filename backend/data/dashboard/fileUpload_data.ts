import { db } from "../../nodeMysql/database";
import { PostFile, GetFile } from "../../model/dashboard/fileUpload_mdl";


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


  export async function selectFileId(): Promise<Array<GetFile>> {

    const query: string =
      `select coalesce(max(cast(file_id as decimal(10,0))), 0) + 1 as file_id FROM comm.files`;
      // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
      console.log('Executing SQL:', query);
    return db.execute(query, []).then((result: any) => result[0]);
  }


  export async function insertFile(fileInfo: PostFile): Promise<PostFile> {
  const {
    file_id,
    file_seq,
    file_name,
    file_size,
    file_path,
    sevr_file_name,
    use_yn
  } = fileInfo;

  // file_seq setting
  const setFileSeqQuery: string = `
    SET @next_file_seq = (SELECT coalesce(max(cast(file_seq as decimal(10,0))), 0) + 1 FROM comm.files where file_id = ?);
  `;

  const insertQuery: string =
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
        ?,
        @next_file_seq,
        ?,
        ?,
        ?,
        ?,
        ?,
        NOW()
    );`;

    const getNextFileSeqQuery: string = `SELECT @next_file_seq AS next_file_seq;`;

  try {
    // 트랜잭션 시작
    // const connection = await db.getConnection(); // 트랜잭션을 위한 커넥션 생성
    // await db.beginTransaction();

    await db.execute(setFileSeqQuery,[file_id]); // Set the next file_id
    console.log('Executing SQL:', setFileSeqQuery);

    const [result]: any = await db.execute(insertQuery, [
      file_id,
      // file_seq,
      file_name,
      file_size,
      file_path,
      sevr_file_name,
      use_yn
    ]);
    console.log('Executing SQL:', insertQuery);

    // file_seq 생성하기 가져오기
    const [nextFileSeq]: any = await db.execute(getNextFileSeqQuery);

    // Return the generated file_id or result information
    // console.log("result   :: ", result);

    fileInfo.file_seq = nextFileSeq[0].next_file_seq;

    const insertedFileInfo = {
      ...fileInfo,
      file_seq: nextFileSeq[0].next_file_seq,
    };

    return insertedFileInfo;
    
  } catch (error) {

    // 트랜잭션 롤백
    // await db.rollback();

    // throw new Error(`Failed to insert file: ${(error as Error).message}`);
    if (error instanceof Error) {
      throw new Error(`Failed to insert file: ${error.message}`);
    } else {
      throw new Error('Failed to insert file: Unknown error occurred.');
    }
  }
}