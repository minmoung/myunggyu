import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellEditStartParams, GridCellEditStopParams, GridColDef, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

interface CmmDataGridProps<T> {
  rows: T[];
  setRows: React.Dispatch<React.SetStateAction<T[]>>;
  columns: GridColDef[]; // 부모 컴포넌트에서 전달받을 컬럼 정의
  editMode?: 'row' | 'cell'; // editMode를 부모에서 전달받기 위해 추가
  getRowId: (row: T) => string | number; // 고유한 Row ID를 가져오기 위한 함수
  status?: true | false
  onRowSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
  onCellClick?: (params: any) => void;
  onRowClick?: (params: any) => void;
}

function CmmDataGrid<T>({ rows, setRows, columns, editMode = 'cell', getRowId, status = false, onRowSelectionModelChange, onCellClick, onRowClick }: CmmDataGridProps<T>) {

  type RowWithStatus = T & { id?: string; status?: string };
  const rowsWithStatus: RowWithStatus[] = rows as RowWithStatus[];
  const [editingCell, setEditingCell] = useState<{ id: string | number; field: string } | null>(null);
  const getRowIdWithFallback = (row: T) => getRowId ? getRowId(row) : uuidv4();
  const apiRef = useGridApiRef(); 

  useEffect(() => {
    console.log("========= useEffect =========");
    setRows((prevRows) => {
      let isUpdated = false;
      const updatedRows = prevRows.map((row) => {
        if (!(row as RowWithStatus).id) {
          // console.log("row ::" , row);
          isUpdated = true;
          return { ...row, id: uuidv4() };
        }
        return row;
      });
  
      return isUpdated ? updatedRows : prevRows;
    });
  }, [setRows]);

  // useEffect(() => {
    
    
  // });

  // 수정 상태 셋팅
  const processRowUpdate = (changRow: RowWithStatus) => {

      // 현재 행을 찾는다
      const currentRow = rows.find((row) => getRowId(row) === getRowId(changRow));
      
      // 값이 변경되었는지 확인 (속성마다 비교)
      const isEdited = currentRow && Object.keys(changRow).some(
        (key) => currentRow[key as keyof T] !== changRow[key as keyof T]
      );


      // 수정 상태 업데이트
      const updatedRow : RowWithStatus = {
        ...changRow,
        id: changRow.id || uuidv4(), // ID가 없으면 새로운 UUID 생성
        // status: isEdited ? 'edited' : (currentRow as RowWithStatus)?.status, // 값이 변경되었으면 'edited'로 설정
        status: (currentRow as RowWithStatus)?.status === 'insert' ? 'insert' : (currentRow as RowWithStatus)?.status === 'delete' ? 'delete' : isEdited ? 'update' : (currentRow as RowWithStatus)?.status // 상태가 'insert','delete' 이면 그대로 유지
      };

      setRows((prevRows) =>
        prevRows.map((row) => (getRowId(row) === getRowId(changRow) ? updatedRow : row))
      );

      // console.log("updatedRows ::", updatedRow);
      return updatedRow; // 반환할 때 updatedRow를 반환
  };

  // 오류 처리
  const handleProcessRowUpdateError = (error: any) => {
    console.error('Error updating row:', error);
  };


  // 셀 편집 시작
  const handleCellEditStart = (params : GridCellEditStartParams) => {
    console.log("========== handleCellEditStart ==========");
    setEditingCell({ id: params.id, field: params.field });
  };

  // 셀 편집 완료
  const handleCellEditStop = (params : GridCellEditStopParams) => {
    console.log("========== handleCellEditStop ==========");
    const { id, field, value } = params;
    setRows((prevRows) =>
      prevRows.map((row) =>
        getRowId(row) === id ? { ...row, [field]: value } : row
      )
    );
    setEditingCell(null);
  };

  // status가 true일 경우 상태 컬럼 추가
  const extendedColumns: GridColDef[] = status? [
      {
        field: 'status',
        headerName: '상태',
        renderCell: (params) => {
          // const statusValue = params.row['status'];
          const statusValue = params.row.status;
          let displayText = '';
          let color = 'black';

          switch (statusValue) {
            case 'insert':
              displayText = '신규';
              color = 'green';
              break;
            case 'update':
              displayText = '수정됨';
              color = 'blue';
              break;
            case 'delete':
              displayText = '삭제됨';
              color = 'red';
              break;
            default:
              displayText = '없음';
              color = 'gray';
              break;
          }

          return <span style={{ color }}>{displayText}</span>;
        },
        width: 60,
      },
      ...columns,
    ]
  : columns;

  
  const handleRowClick = (params: any) => {
    if (onRowClick) {
      onRowClick(params);
    }
  }

  // 클릭 시 편집 모드로 진입
  const handleCellClick = (params: any) => {
    
    // onCellClick(params);
    // 부모에 onCellClick 이벤트 전달
    if (onCellClick) {
      onCellClick(params);
    }

    // 클릭한 셀을 편집 모드로 전환
    console.log("params.isEditable  ::", params.isEditable);
    const isCellInEditMode = apiRef.current.getCellMode(params.id, params.field) === 'edit';
    
    if (params.isEditable && !isCellInEditMode) {
      apiRef.current.startCellEditMode({ id: params.id, field: params.field });
    }
  };

  const handleRowSelectionModelChange = (newSelection: any) => {
    if (onRowSelectionModelChange) {
      onRowSelectionModelChange(newSelection);
    }
  };
  
  
  return (
    
      <DataGrid
        rows={rows as RowWithStatus[]}
        // rows={rows as (T & { id: string })[]} // rows를 id가 있는 형태로 타입 캐스팅
        columns={extendedColumns}
        editMode={editMode} // 행 편집 모드 설정
        apiRef={apiRef}  // apiRef 추가
        processRowUpdate={processRowUpdate} // 업데이트 처리 함수
        // autoHeight
        // 추가적으로, 각 행의 모델이 올바른 타입인지 확인
        // getRowId={(row) => (row as RowWithStatus).id ?? uuidv4()} // UUID로 Row ID 설정
        // getRowId={(row) => (row as RowWithStatus).id!}
        getRowId={getRowIdWithFallback} // ID가 없으면 UUID로 설정
        onProcessRowUpdateError={handleProcessRowUpdateError} // 오류 처리 함수
        rowHeight={40} // 각 행의 높이를 60px로 설정
        hideFooterSelectedRowCount // 선택된 row 수를 숨김
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        onRowClick={handleRowClick}
        onCellClick={handleCellClick} // 클릭 이벤트 핸들러 추가
        onRowSelectionModelChange={handleRowSelectionModelChange}
      />
    
  );
}

export default CmmDataGrid;