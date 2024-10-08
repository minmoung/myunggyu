
// row 상태값을 초기화 한다.
export function updateStatus<T extends { status: string }>(
  rows: T[],
): T[] {
  return rows
    .map((row) => {
      if (row.status === 'insert' || row.status === 'update') {
        return { ...row, status: 'none' }; // 상태를 'none'으로 변경
      }
      if (row.status === 'delete') {
        return null; // 삭제를 표시
      }
      return row; // 그대로 반환
    })
    .filter((row): row is T => row !== null); // null 값을 제외
}


// row 상태값을 Delete 한다.
export function deleteStatus<T extends { status: string }>(
  rows: T[],
): T[] {
  return rows
    .map((row) => {
      console.log("row.status  :: ", row.status);
      if (row.status === 'insert') {
        return null; // row를 삭제한다.
      }
      if (row.status === 'update' || row.status === 'none') {
        return { ...row, status: 'delete' }; // 상태를 'none'으로 변경
      }
      // if (row.status === 'delete') {
      //   return null; // 삭제를 표시
      // }
      return row; // 그대로 반환
    })
    .filter((row): row is T => row !== null); // null 값을 제외
}