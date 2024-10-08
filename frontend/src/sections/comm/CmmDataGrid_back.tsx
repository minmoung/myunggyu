import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

  interface RowData {
    id: number;
    name: string;
    age: string;
    status: 'new' | 'edited' | 'deleted' | 'none'; // 상태 정의
  }

  interface CmmDataGrid_backProps {
    rows: RowData[];
    setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
    editMode?: 'row' | 'cell';  // editMode를 부모에서 전달받기 위해 추가
  }

  const CmmDataGrid_back: React.FC<CmmDataGrid_backProps> = ({ rows, setRows, editMode }) => {

    // 수정상태 셋팅
    const processRowUpdate = (newRow: RowData) => {
      console.log("===== processRowUpdate =====");

      // 현재 행을 찾는다
      const currentRow = rows.find(row => row.id === newRow.id);
      
      // 값이 변경되었는지 확인
      const isEdited = currentRow?.name !== newRow.name || currentRow?.age !== newRow.age;

      // 수정 상태 업데이트
      const updatedRow = {
        ...newRow,
        status: isEdited ? 'edited' : currentRow?.status // 값이 변경되었으면 'edited'로 설정
        // status: currentRow?.status === 'new' ? 'new' : isEdited ? 'edited' : currentRow?.status // 상태가 'new'이면 그대로 유지
        // status: currentRow?.status === 'new' ? 'new' : isEdited ? 'edited' : currentRow?.status // 상태가 'new'이면 그대로 유지
      };

      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      console.log("updatedRows ::", updatedRow);
      console.log("newRow.id ::", newRow.id);
      return updatedRow; // 반환할 때 updatedRow를 반환
    };


    // 클릭 시 편집 모드로 진입
    const handleCellClick = (params: any) => {
      const { id, field } = params;
      if (field === 'name' || field === 'age') { // 편집할 수 있는 필드
        const rowData = rows.find(row => row.id === id);
        if (rowData) {
          // 편집 모드로 전환
          params.api.startRowEditMode(rowData);
        }
      }
    };
    
    // 컬럼 정의
    const columns: GridColDef[] = [
      {
        field: 'status',
        headerName: '상태',
        renderCell: (params) => {
            // 상태에 따라 텍스트 및 스타일 변경
            const status = params.row.status;
            let displayText = '';
            let color = 'black'; // 기본 색상

            switch (status) {
                case 'new':
                    displayText = '신규';
                    color = 'green'; // 신규 상태 색상
                    break;
                case 'edited':
                    displayText = '수정됨';
                    color = 'blue'; // 수정 상태 색상
                    break;
                case 'deleted':
                    displayText = '삭제됨';
                    color = 'red'; // 삭제 상태 색상
                    break;
                default:
                    displayText = '없음';
                    color = 'gray'; // 기본 상태 색상
                    break;
            }

            return <span style={{ color }}>{displayText}</span>;
        },
      },
      { field: 'id', headerName: 'ID', width: 100, editable: false, flex:0.5, headerAlign: 'center'},
      { field: 'name', headerName: 'Name', width: 150, editable: true, flex:2, headerAlign: 'center'},
      { field: 'age', headerName: 'Age', width: 100, editable: true, flex:1, headerAlign: 'center' },
    ];

  
    // 오류 처리
    const handleProcessRowUpdateError = (error: any) => {
      console.error('Error updating row:', error);
    };

    return (

      <div style={{ height: 400, width: '100%' }}>
        
        <DataGrid
          rows={rows} // RowData[]를 전달
          columns={columns}
          editMode="row" // 행 편집 모드 설정
          processRowUpdate={processRowUpdate} // 업데이트 처리 함수
          autoHeight
          // 추가적으로, 각 행의 모델이 올바른 타입인지 확인
          getRowId={(row) => row.id} // Row ID 지정
          onProcessRowUpdateError={handleProcessRowUpdateError} // 오류 처리 함수
          onCellClick={handleCellClick} // 클릭 이벤트 핸들러 추가
          rowHeight={40} // 각 행의 높이를 60px로 설정
          hideFooterSelectedRowCount // 선택된 row 수를 숨김
        />
 
      </div>
    );
  };

export default CmmDataGrid_back;