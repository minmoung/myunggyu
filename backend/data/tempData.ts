import { db } from "../nodeMysql/database";
import { PostTemp, GetTemp, GetCnt} from "../model/tempView";

export async function searchRow(): Promise<Array<GetTemp>> {
  const query: string =
    "select row_number() over (order by a.col1 desc) as row_id, col1, col2, col3, col4, col5, col6, col7 from temp1 a";

  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  // console.log('With Parameters:', codeInfo);
  
  return db.execute(query).then((result: any) => result[0]);
}

// insert 전에 동일 code 체크
export async function checkRow(codeInfo: PostTemp): Promise<Array<GetCnt>> {
  console.log('codeInfo  ::', codeInfo);
  const { col1 } = codeInfo;
  const query: string =
    "select count(*) as cnt from temp1 where col1 = ?";
  return db.execute(query, [col1]).then((result: any) => result[0]);
}

export async function insertRow(codeInfo: PostTemp): Promise<string> {
  const {
    col1,
    col2,
    col3,
    col4,
    col5,
    col6,
    col7,
    
  } = codeInfo;

  const query: string =
    "insert into temp1 (col1, col2, col3, col4, col5, col6, col7) values (?, ?, ?, ?, ?, ?, ?)";
  
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', codeInfo);
  return db
    .execute(query, [
      col1,
      col2,
      col3,
      col4,
      col5,
      col6,
      col7,
    ])
    .then((result: any) => result[0].updateId);
}

export async function updateRow(codeInfo: PostTemp): Promise<number> {
  const {
    col1,
    col2,
    col3,
    col4,
    col5,
    col6,
    col7,
  } = codeInfo;

  const query: string = `
    update temp1 set
      col2 = ?
      ,col3 = ?
      ,col4 = ?
      ,col5 = ?
      ,col6 = ?
      ,col7 = ?
    where col1 = ?
  `;

  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', codeInfo);

  try {
    // 데이터베이스 쿼리 실행
    const [result]: any = await db.execute(query, [
    col2,
    col3,
    col4,
    col5,
    col6,
    col7,
    col1,
    ]);

    // 업데이트된 행의 수를 반환
    return result.affectedRows;

  } catch (error) {
    // 오류 처리
    console.error("Error updating query:", error);
    throw new Error("Failed to update query");
  }
}

export async function deleteRow(codeInfo: PostTemp): Promise<string> {
  const { col1 } = codeInfo;

  const query: string =
    "delete from temp1 where col1 = ?";
  
  // 쿼리 실행 전에 SQL과 파라미터를 콘솔에 출력
  console.log('Executing SQL:', query);
  console.log('With Parameters:', codeInfo);

  return db
    .execute(query, [
      col1,
    ])
    .then((result: any) => result[0].insertId);
}
