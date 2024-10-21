
const backUrl = import.meta.env.VITE_BACKEND_URL;

export const saveRows = async (rows: any[], insertUrl:String, updateUrl:String, deleteUrl:String) => {

  // rows를 status 값에 따라 분리
  const insertRows = rows.filter(row => row.status === 'insert');
  const updatedRows = rows.filter(row => row.status === 'update');
  const deleteRows = rows.filter(row => row.status === 'delete');

  console.log("insertRows  ::", insertRows);
  console.log("updatedRows  ::", updatedRows);
  console.log("deleteRows  ::", deleteRows);
  try {

    // 기존 행을 추가하는 요청
    if (insertRows.length > 0) {
      const insertResponse = await fetch(`${backUrl}${insertUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertRows),  // 전체 rows 데이터를 서버로 전송
      });
      
      const insertResult = await insertResponse.json();
      console.log("Insert result: ", insertResult);
      console.log("insertResult.success: ", insertResult.success);
      
      if (!insertResult.success) {
        return { success: false, message: '데이터 저장 중 오류가 발생했습니다.', msg: insertResult.message };
      }
    }
  
    // 기존 행을 업데이트하는 요청
    if (updatedRows.length > 0) {
      const updateResponse = await fetch(`${backUrl}${updateUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRows),  // 업데이트할 행 데이터만 전송
      });

      const updateResult = await updateResponse.json();
      console.log("Update result: ", updateResult);

      if (!updateResult.success) {
        return { success: false, message: '데이터 업데이트 중 오류가 발생했습니다.', msg: updateResult.message };
      }
    }


    // 기존 행을 삭제하는 요청
    if (deleteRows.length > 0) {
      const updateResponse = await fetch(`${backUrl}${deleteUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteRows),  // 업데이트할 행 데이터만 전송
      });

      const updateResult = await updateResponse.json();
      console.log("Update result: ", updateResult);

      if (!updateResult.success) {
        return { success: false, message: '데이터 업데이트 중 오류가 발생했습니다.', msg: updateResult.message };
      }
    }

    return { success: true, message: '모든 데이터가 성공적으로 저장되었습니다.' };  

  } catch (error) {
    console.error('Error:', error);
    // throw error; // 에러를 다시 던져서 호출하는 컴포넌트에서 처리하도록 함
    return { success: false, message: '데이터 저장 중 오류가 발생했습니다.', msg: error.toString()};
  }
};


export const searchRows = async (rows: any[] | null, searchUrl:String) => {
  try {
    const paramRow = rows ?? [];
    const response = await fetch(`${backUrl}${searchUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paramRow),  // 전체 rows 데이터를 서버로 전송
    });
    
    const result = await response.json();
    // console.log("result : ", result); // 서버 응답 처리

    return result; // 결과를 반환하여 호출하는 컴포넌트에서 처리
  } catch (error) {
    console.error('Error:', error);
    // throw error; // 에러를 다시 던져서 호출하는 컴포넌트에서 처리하도록 함
    return { success: false, message: '데이터 조회 중 오류가 발생했습니다.', msg: error.toString()};
  }
};

