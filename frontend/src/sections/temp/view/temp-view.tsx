import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Delete, Security, FileCopy } from '@mui/icons-material';
import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { saveRows, searchRows } from 'src/sections/comm/DatabaseApi';
import AlertSnackbar from 'src/sections/comm/AlertSnackbar';
import { updateStatus } from 'src/sections/comm/utils';
import GridEditSelectCell from 'src/sections/comm/GridEditSelectCell';
import 'src/theme/styles/titleBox.css'

import CmmDataGrid from '../../comm/CmmDataGrid';
import CmmBtn from '../../comm/CmmBtn';
import CmmMenuTitle from '../../comm/CmmMenuTitle';
import { useFetchCommCode } from '../../comm/useFetchCommCode';
import GridCellExpand from '../../comm/GridCellExpand';


// import { DataGridPremium } from '@mui/x-data-grid-premium';

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

  const [rows, setRows] = useState<RowData[]>([]);
  // const [upCodeRows, setUpCodeRows] = useState<RowUpCodeData[]>([]);
  const [searchUrl] = useState('/api/temp/search');
  const [insertUrl] = useState('/api/temp/insert');
  const [updateUrl] = useState('/api/temp/update');
  const [deleteUrl] = useState('/api/temp/delete');
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  

  // 각 공통 코드 호출을 별도로 선언
  const { commCode: commCode_001, codeLoading: loading_001, codeError: fetchError_001 } = useFetchCommCode('001');
  const { commCode: commCode_003, codeLoading: loading_003, codeError: fetchError_003 } = useFetchCommCode('003');
  const { commCode: commCode_004, codeLoading: loading_004, codeError: fetchError_004 } = useFetchCommCode('004');
  const [selectedCode_004, setSelectedCode_004] = useState<string>(''); // 선택된 code_cd를 저장
  
  if (loading_001 || loading_003 || loading_004) {
    return <div>Loading...</div>;
  }

  if (fetchError_001 || fetchError_003 || fetchError_004) {
    return <div>Error fetching comm codes</div>;
  }
  
  
  // tooltip 스크립트
  const renderCellExpand = (params: GridRenderCellParams) => {
    // params에서 필요한 값을 추출
    // const width = params.colIndex; // 예시: 컬럼 인덱스를 width로 사용
    const width = 90; // 예시: 컬럼 인덱스를 width로 사용
    const value = params.value; // 실제 셀의 값을 사용
    
    return (
      <GridCellExpand width={width} value={value} />
    );
  };

  const deleteUser = (id: GridRowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.row_id !== id));
  };

  const toggleAdmin = (id: GridRowId) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.row_id === id ? { ...row, status: 'delete' } : row))
    );
  };

  const duplicateUser = (id: GridRowId) => {
    setRows((prevRows) => {
      const rowToDuplicate = prevRows.find((row) => row.row_id === id)!;
      return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
    });
  };

  // GridColDef 배열에 맞는 columns 정의
  const upCodeColumns: GridColDef[] = [
    { field: 'col1', headerName: 'COL1 EDIT', width: 90, editable: true, flex:2, headerAlign: 'center'},
    {
      field: 'col2',
      headerName: 'COL2 Select',
      editable: true,
      width: 150,
      renderEditCell: (params) => (
        <GridEditSelectCell
            {...params}
            commCode={commCode_001} // commCode 값을 props로 전달
        />
      ),
      // 편집 모드가 아닐 때 code_cd를 code_nm으로 변환하여 표시
      valueFormatter: (codeValue: String) => {
        const selectedCode = commCode_001.find((code: CommCode) => code.code_cd === codeValue);
        return selectedCode ? selectedCode.code_nm : codeValue; // code_nm을 표시하고, 없으면 code_cd 그대로
      },
    },
    // { field: 'col2', headerName: 'COL2', width: 90, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    { field: 'col3', headerName: 'COL3', width: 90, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    // { field: 'col4', headerName: 'COL4', width: 90, editable: true, type: 'string', flex:2, headerAlign: 'center'},
    {
      field: 'col4',
      headerName: 'COL4 Select',
      editable: true,
      width: 150,
      renderEditCell: (params) => (
        <GridEditSelectCell
            {...params}
            commCode={commCode_004} // commCode 값을 props로 전달
        />
      ),
      // 편집 모드가 아닐 때 code_cd를 code_nm으로 변환하여 표시
      valueFormatter: (codeValue: String) => {
        const selectedCode = commCode_004.find((code: CommCode) => code.code_cd === codeValue);
        return selectedCode ? selectedCode.code_nm : codeValue; // code_nm을 표시하고, 없으면 code_cd 그대로
      },
    },
    { field: 'col5', headerName: 'COL5 TIP', width: 90, editable: true, type: 'string', flex:2, headerAlign: 'center', renderCell: renderCellExpand},
    // { field: 'col5', headerName: 'COL5', width: 90, editable: true, type: 'string', flex:2, headerAlign: 'center' },
    { field: 'col6', headerName: 'COL6', width: 100, type: 'string', flex:2, headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <strong>
          <Button
            variant="contained"
            size="medium"
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            Open
          </Button>
          버튼
        </strong>
      )
    },
    { field: 'col7', headerName: 'COL7', width: 90, editable: true, type: 'number', flex:2, headerAlign: 'center'},
    
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => deleteUser(params.id)} />,
        <GridActionsCellItem icon={<Security />} label="Toggle Admin" onClick={() => toggleAdmin(params.id)} showInMenu />,
        <GridActionsCellItem icon={<FileCopy />} label="Duplicate User" onClick={() => duplicateUser(params.id)} showInMenu />,
      ],
    },
    
  ];

  // useEffect(() => {
    
  // }); 
  
  
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
        showAlert('col1는 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].col2) {
        showAlert('col2는 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }

      if (invalidFields[0].col3) {
        showAlert('col3는 필수 항목입니다', 'warning');  // 경고 메시지 출력
      }
      return false; // 유효하지 않음을 반환
    }
     return true;
  };


  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
      setAlertMessage(message);  // 메시지 정의
      setAlertSeverity(severity); // 메시지 타입 정의
      setAlertOpen(true);  // 메시지 오픈
  };

  // Alert '확인' 및 'X' 클릭시
  const alertClose = () => {
      setAlertOpen(false);
  };
 
  
  // Select 관련 이벤트
  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value);
    setSelectedCode_004(event.target.value);
    
  };

  return (

    <DashboardContent>
      
      <CmmMenuTitle title='Temp1'/>
      <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label_004">코드 004 Select1</InputLabel>
        <Select
          labelId="label_004"
          id="commCode_004"
          value={selectedCode_004}
          onChange={handleChange}
          label="코드1"
          // autoWidth
        >
        {commCode_004 && commCode_004.map((code) => (
          <MenuItem key={code.code_cd} value={code.code_cd}>
            {code.code_nm} {/* code_nm을 표시 */}
          </MenuItem>
        ))}  
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="commCode_004">코드 004 Select2</InputLabel>
        <Select
          labelId="commCode_004"
          id="commCode_004"
          value={selectedCode_004}
          onChange={handleChange}
          // autoWidth
        >
          {commCode_004 && commCode_004.map((code) => (
          <MenuItem key={code.code_cd} value={code.code_cd}>
            {code.code_nm} {/* code_nm을 표시 */}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">코드 004 Select3</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCode_004}
          label="Age"
          onChange={handleChange}
          // autoWidth
        >
          {commCode_004 && commCode_004.map((code) => (
          <MenuItem key={code.code_cd} value={code.code_cd}>
            {code.code_nm} {/* code_nm을 표시 */}
          </MenuItem>
        ))}
        </Select>
        <FormHelperText>Select 도움말</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={selectedCode_004}
          onChange={handleChange}
          // autoWidth
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {commCode_004 && commCode_004.map((code) => (
          <MenuItem key={code.code_cd} value={code.code_cd}>
            {code.code_nm} {/* code_nm을 표시 */}
          </MenuItem>
        ))}
        </Select>
        <FormHelperText>라벨이 없음</FormHelperText>
      </FormControl>
      </div>
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
