import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { MenuItem, Select } from '@mui/material';
import { GridColDef, GridRowSelectionModel, GridRenderEditCellParams } from '@mui/x-data-grid';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { saveRows, searchRows } from 'src/sections/comm/DatabaseApi';
import AlertSnackbar from 'src/sections/comm/AlertSnackbar';
import { updateStatus } from 'src/sections/comm/utils';
import 'src/theme/styles/titleBox.css'

import CmmDataGrid from '../../comm/CmmDataGrid';
import CmmBtn from '../../comm/CmmBtn';
import CmmMenuTitle from '../../comm/CmmMenuTitle';


interface RowData { 
  row_id: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  status: 'insert' | 'update' | 'delete' | 'none';
}

// 상위코드 타입 정의
interface CommCode {
  code_cd: string;
  code_nm: string;
}

// ----------------------------------------------------------------------

export function CodeView() {

  // GridColDef 배열에 맞는 columns 정의
  const upCodeColumns: GridColDef[] = [
    {
      field: 'code_cd',
      headerName: '공통코드',
      editable: true,
      renderEditCell: (params) => <EditSelectCell {...params} />,
      width: 150,
    },
    { field: 'col1', headerName: 'COL1', width: 100, editable: true, flex:0.5, headerAlign: 'center'},
    { field: 'col2', headerName: 'COL2', width: 100, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col3', headerName: 'COL3', width: 100, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col4', headerName: 'COL4', width: 100, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col5', headerName: 'COL5', width: 100, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col6', headerName: 'COL6', width: 100, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col7', headerName: 'COL7', width: 100, editable: true, type: 'number', flex:1, headerAlign: 'center'},
  ];

  const [rows, setRows] = useState<RowData[]>([]);
  // const [upCodeRows, setUpCodeRows] = useState<RowUpCodeData[]>([]);
  const [searchUrl] = useState('/api/temp/search');
  const [insertUrl] = useState('/api/temp/insert');
  const [updateUrl] = useState('/api/temp/update');
  const [deleteUrl] = useState('/api/temp/delete');
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([]);
  // const [selectedRowData, setSelectedRowData] = useState<RowUpCodeData>();
  const [commCodeSearchUrl] = useState('/api/code/codeSearch/001');
  
  useEffect(() => {
   
  },[]);

  // 공통코드 가져오기
  const EditSelectCell = (params: GridRenderEditCellParams) => {
    const [commCode, setCommCode] = useState<CommCode[]>([]);
    const { value, api, id, field } = params;

    useEffect(() => {
      const fetchCodes = async () => {
        console.log("==== commcode ====");
        try {
          const response = await searchRows(rows, commCodeSearchUrl);
          console.log("response.data  :: " , response.data);
          setCommCode(response.data);
        } catch (error) {
          console.error('Error fetching up codes:', error);
        }
      };

      fetchCodes();
    }, []);

    return (
      <Select value={value || ''} onChange={(event) => api.setEditCellValue({ id, field, value: event.target.value })}>
        {(commCode ?? []).map((option) => (
          <MenuItem key={option.code_cd} value={option.code_cd}>
            {option.code_nm}
          </MenuItem>
        ))}
      </Select>
    );
  };
  
  // 행 추가 함수 정의
  const handleAddRow = () => {

    const newRow: RowData = {
      row_id: (rows.length + 1).toString(),
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: '',
      col6: '',
      col7: (rows.length + 1).toString(),
      status: 'insert',
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  
  const handleSearchRow = async (e: React.FormEvent) => {
    e.preventDefault();
      const result = await searchRows(rows, searchUrl);
      
      if (result.message) {
        // 서버의 경고 메시지 처리
        showAlert(result.message, 'warning');
      }
      setRows(result);
  };

  const handleRowClick = (params : any) => {
    // 선택된 행의 데이터를 설정
    console.log("선택한 Row의 Value  ::",params.row);
    
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
    console.log("선택한 Row의 row_id ::",selectionIds);
    setSelectedRowsId(selectionIds.map(String));
  };

  const handleDelRow = async (e: React.FormEvent) => {
    console.log("parent selectedRows :: ", selectedRowsId);

    setRows((prevRows) =>
      prevRows.map((row) => {
        console.log('row_id : ', row.col1);
        console.log('selectedRows : ', selectedRowsId);
        
        return selectedRowsId.includes(row.row_id.toString())
          ? { ...row, status: 'delete' }
          : row
        })
    );
  };

  const validateForm = () => {

    const validateErrorsArray = rows.map((row) => ({
        col1: row.col1 === '', // code_cd가 비어 있으면 true
        col2: row.col2 === '', // code_nm이 비어 있으면 true
        col3: row.col3 === '', // up_code_cd가 비어 있으면 true
    }));

    
    // 각 행에서 어떤 항목이 유효하지 않은지 확인
    const invalidFields = validateErrorsArray.filter((errors) =>
      Object.values(errors).some((value) => value === true)
    );

    if (invalidFields.length > 0) {
      console.log("invalidFields :: ", invalidFields);

      if (invalidFields[0].col1) {
        showAlert('col1은 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].col2) {
        showAlert('col2은은 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].col3) {
        showAlert('col3은는 필수 항목입니다', 'warning');  // 경고 메시지 출력
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
      
      <CmmMenuTitle title='Temp1'/>

      <Box className="titleBox">
        <CmmBtn text='추가' onClick={handleAddRow}/>
        <CmmBtn text='삭제' onClick={handleDelRow}/>
        <CmmBtn text='저장' onClick={handleSaveRow}/>
        <CmmBtn text='조회' onClick={handleSearchRow}/>
      </Box>

      
      <CmmDataGrid rows={rows}
                    setRows={setRows}
                    columns={upCodeColumns}
                    // getRowId={(row) => upCodeRows.length}
                    getRowId={(row) => row.row_id}
                    onRowSelectionModelChange={handleSelectionChange}
                    // onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    editMode='cell'   // cell로 설정해야 onCellEditStart, onCellEditStop 이벤트가 발생한다.
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
