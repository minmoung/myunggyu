import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowsProp, GridColDef, GridRowModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { saveRows, searchRows } from 'src/sections/comm/DatabaseApi';
import AlertSnackbar from 'src/sections/comm/AlertSnackbar';
import { updateStatus,deleteStatus } from 'src/sections/comm/utils';
import 'src/theme/styles/titleBox.css'

import CmmDataGrid from '../../comm/CmmDataGrid';
import CmmBtn from '../../comm/CmmBtn';
import CmmMenuTitle from '../../comm/CmmMenuTitle';




interface RowUpCodeData {
  row_id: string;
  up_code_cd: string;
  up_code_nm: string;
  sort: number;
  status: 'insert' | 'update' | 'delete' | 'none';
}

interface RowData {
  row_id: string;
  code_cd: string;
  code_nm: string;
  up_code_cd: string;
  sort: number;
  status: 'insert' | 'update' | 'delete' | 'none';
}

// ----------------------------------------------------------------------

export function CodeView() {

  // GridColDef 배열에 맞는 columns 정의
  const upCodeColumns: GridColDef[] = [
    { field: 'up_code_cd', headerName: '상위코드', width: 70 , editable: true, flex:0.5, headerAlign: 'center'},
    { field: 'up_code_nm', headerName: '상위코드명', width: 150, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'sort', headerName: '정렬순서', width: 100, editable: true, type: 'number', flex:1, headerAlign: 'center' },
    // 추가적인 필드 정의
  ];

  // GridColDef 배열에 맞는 columns 정의
  const columns: GridColDef[] = [
    { field: 'up_code_cd', headerName: '상위코드', width: 70 , editable: true, flex:0.5, headerAlign: 'center'},
    { field: 'code_cd', headerName: '코드', width: 70 , editable: true, flex:0.5, headerAlign: 'center'},
    { field: 'code_nm', headerName: '코드명', width: 150, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'sort', headerName: '정렬순서', width: 100, editable: true, type: 'number', flex:1, headerAlign: 'center' },
    // 추가적인 필드 정의
  ];

  const [rows, setRows] = useState<RowData[]>([]);
  const [upCodeRows, setUpCodeRows] = useState<RowUpCodeData[]>([]);
  const [upCodeSearchUrl] = useState('/api/code/upCodeSearch');
  // const [upCodeSaveUrl] = useState('/api/code/upCodeSave');
  const [upCodeInsertUrl] = useState('/api/code/upCodeInsert');
  const [upCodeUpdateUrl] = useState('/api/code/upCodeUpdate');
  const [upCodeDeleteUrl] = useState('/api/code/upCodeDelete');
  const [searchUrl] = useState('/api/code/search');
  const [insertUrl] = useState('/api/code/insert');
  const [updateUrl] = useState('/api/code/update');
  const [deleteUrl] = useState('/api/code/delete');
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<RowUpCodeData>();
  
  useEffect(() => {
   
  },[]);

  // 행 추가 함수 정의
  const handleUpCodeAddRow = () => {
    const newRow: RowUpCodeData = {
      row_id:(upCodeRows.length + 1).toString(),
      up_code_cd: '',
      up_code_nm: '',
      sort: upCodeRows.length + 1,
      status: 'insert',
    };
    setUpCodeRows((prevRows) => [...prevRows, newRow]);
  };


  // 행 추가 함수 정의
  const handleAddRow = () => {

    if (selectedRowData) {
      const newRow: RowData = {
        // code_cd: (rows.length + 1).toString(),
        row_id: (rows.length + 1).toString(),
        code_cd: '',
        code_nm: '',
        up_code_cd: selectedRowData.up_code_cd,
        sort: rows.length + 1,
        status: 'insert',
      };
      setRows((prevRows) => [...prevRows, newRow]);
    }else{

      showAlert('먼저 상위 코드를 선택하세요.', 'warning');
    }
  };

  
  const handleUpCodeSearchRow = async (e: React.FormEvent) => {
    e.preventDefault();
      const result = await searchRows(rows, upCodeSearchUrl);
      
      if (result.message) {
        // 서버의 경고 메시지 처리
        showAlert(result.message, 'warning');
      }
      setUpCodeRows(result);
  };

  const handleRowClick = (params : any) => {
    // 선택된 행의 데이터를 설정
    console.log("params.row  ::",params.row);
    setSelectedRowData(params.row);
    handleSearchRow(params.row); // 업데이트된 row 데이터를 바로 search 함수에 전달
  };
  

  const handleSearchRow = useCallback(async (rowData : RowUpCodeData) => {
    console.log("==== handleSearchRow ====", rowData);
    if (!rowData) return;
    
    const result = await searchRows([rowData], searchUrl);
    console.log("rowData  ::", rowData);
    if (result.message) {
      // 서버의 경고 메시지 처리
      showAlert(result.message, 'warning');
    }
    setRows(result);
  }, [searchUrl]);

  
  const handleUpCodeSaveRow = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수값 체크
    if (!validateForm()) {
      return; // 필수값 체크에 실패하면 함수 종료
    }
    
    const result = await saveRows(upCodeRows, upCodeInsertUrl, upCodeUpdateUrl, upCodeDeleteUrl);
    
    if (result.success) {
      // 상태값 갱신
      setUpCodeRows((prevRows) => updateStatus(prevRows));
      showAlert(result.message, 'info');
    }
  };


  const handleSaveRow = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수값 체크
    if (!validateForm()) {
      return; // 필수값 체크에 실패하면 함수 종료
    }

    const result = await saveRows(rows, insertUrl, updateUrl, deleteUrl);
    
    if (result.success) {
      // 상태값 갱신
      setRows((prevRows) => updateStatus(prevRows));
      showAlert(result.message, 'info');
    }
  };

  // DataGrid에서 선택 모델이 변경될 때 호출되는 함수
  const handleSelectionChange = (selectionIds: GridRowSelectionModel) => {
    console.log("parent selectionIds ::",selectionIds);
    setSelectedRowsId(selectionIds.map(String));
  };

  const handleUpcodeDelRow = async (e: React.FormEvent) => {
    console.log("parent selectedRows :: ", selectedRowsId);

    setUpCodeRows((prevRows) =>
      prevRows.map((row) => {
        console.log('row_id : ', row.up_code_cd);
        console.log('selectedRows : ', selectedRowsId);
        // console.log('row_id as string:', row.row_id.toString()); // 문자열로 변환된 row_id 값
        return selectedRowsId.includes(row.row_id.toString())
          ? { ...row, status: 'delete' }
          : row
        })
    );
  };


  const handleDelRow = async (e: React.FormEvent) => {

  };


  const validateForm = () => {

    const validateErrorsArray = rows.map((row) => ({
        code_cd: row.code_cd === '', // code_cd가 비어 있으면 true
        code_nm: row.code_nm === '', // code_nm이 비어 있으면 true
        up_code_cd: row.up_code_cd === '', // up_code_cd가 비어 있으면 true
    }));

    
    // 각 행에서 어떤 항목이 유효하지 않은지 확인
    const invalidFields = validateErrorsArray.filter((errors) =>
      Object.values(errors).some((value) => value === true)
    );

    if (invalidFields.length > 0) {
      console.log("invalidFields :: ", invalidFields);

      if (invalidFields[0].code_cd) {
        showAlert('코드는 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].code_nm) {
        showAlert('코드명은 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].up_code_cd) {
        showAlert('상위코드는 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      return false; // 유효하지 않음을 반환
    }

     return true;
  };


  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
      setAlertMessage(message);  // 메시지 정의
      setAlertSeverity(severity); // 메시지 타입 정의
      setAlertOpen(true);  // 메시지 오픈
  };

  // Alert '확인' 및 'X' 클릭시
  const alertClose = () => {
      setAlertOpen(false);
  };
 

  return (

    <DashboardContent>
      
      <CmmMenuTitle title='Code'/>

      <Box className="titleBox">
        <CmmBtn text='추가' onClick={handleUpCodeAddRow}/>
        <CmmBtn text='삭제' onClick={handleUpcodeDelRow}/>
        <CmmBtn text='저장' onClick={handleUpCodeSaveRow}/>
        <CmmBtn text='조회' onClick={handleUpCodeSearchRow}/>
      </Box>

      
      <CmmDataGrid rows={upCodeRows}
                    setRows={setUpCodeRows}
                    columns={upCodeColumns}
                    // getRowId={(row) => upCodeRows.length}
                    getRowId={(row) => row.row_id}
                    onRowSelectionModelChange={handleSelectionChange}
                    // onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    editMode='cell'   // cell로 설정해야 onCellEditStart, onCellEditStop 이벤트가 발생한다.
                    status
                    />

      <Box className="titleBox">
        <CmmBtn text='추가' onClick={handleAddRow}/>
        <CmmBtn text='삭제' onClick={handleAddRow}/>
        <CmmBtn text='저장' onClick={handleSaveRow}/>
        {/*
        <CmmBtn text='조회' onClick={handleSearchRow}/>
        */}
      </Box>

      <CmmDataGrid rows={rows}
                    setRows={setRows}
                    columns={columns}
                    getRowId={(row) => row.row_id}
                    status
                    />

      <AlertSnackbar
        open={alertOpen} 
        message={alertMessage}
        severity={alertSeverity}
        handleClose={alertClose}
        onConfirm={alertClose}      // 확인 버튼 클릭 시 호출
        onCancel={alertClose}    // 취소 버튼 클릭 시 호출
        />
      
    </DashboardContent>

  );
}
