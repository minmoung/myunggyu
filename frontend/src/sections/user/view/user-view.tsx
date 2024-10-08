import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import AlertSnackbar from 'src/sections/comm/AlertSnackbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';
import UserViewPop from './user-view-pop';


 

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  // const backUrl = process.env.REACT_APP_BACKEND_URL;
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [filterName, setFilterName] = useState('');
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const adminRouterValue = { router: "someValue" }; // 보내고자 하는 데이터
  
      // POST 요청으로 데이터 전달
      const response = await fetch(`${backUrl}/api/users/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보냄
        },
        body: JSON.stringify(adminRouterValue), // 데이터 본문에 추가
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      setUsers(data);
      setLoading(false);

      console.log('Fetched Data:', data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [backUrl]);

  // 유저 데이터를 가져오는 함수
  // const fetchData2 = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:3038/api/users/search');
  //     const data = await response.json();
  //     setUsers(data);
  //     setLoading(false);
  //     /* console.log('data : ', data); */
  //   } catch (error) {
  //     console.error('유저 데이터 가져오기 오류 : ', error);
  //     setLoading(false);
  //   }
  // }, []);

  // 유저 데이터를 삭제하는 함수
  const handleDeleteUser = async (user: UserProps) => {
    // e.preventDefault();

    try {
      const response = await fetch(`${backUrl}/api/users/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        /* body: JSON.stringify(formData), */
        body: JSON.stringify(userToDelete),
      });
      const result = await response.json();
      console.log(result); // 서버 응답 처리
      fetchData(); // 삭제후 재조회
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // new user 버튼 클릭시
  const newUserPop = () => {
    setUserToEdit(null);  // 삭제할 유저 정보를 저장
    handleOpen();  // 다이얼로그 오픈
  }

  // 다이얼로그 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // 다이얼로그 닫기
  const handleClose = () => {
    setOpen(false);
    fetchData(); // 다이얼로그 닫은 후 데이터를 다시 조회
    // showAlert('This is an error message!', 'error');
  };

  

  // 컴포넌트가 마운트될 때 데이터를 한 번 가져옴
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dataFiltered: UserProps[] = applyFilter({
    inputData: users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setAlertMessage(message);  // 메시지 정의
    setAlertSeverity(severity); // 메시지 타입 정의
    setAlertOpen(true);  // 메시지 오픈
  };

  const [openPopover, setOpenPopover] = useState(null);
  const [userToDelete, setUserToDelete] = useState<UserProps | null>(null);
  const [userToEdit, setUserToEdit] = useState<UserProps | null>(null);

  // Edit 클릭시 팝업에 전달
  const handleEditClick = (user: UserProps) => {
    setUserToEdit(user);  // 삭제할 유저 정보를 저장
    handleOpen();  // 다이얼로그 오픈
    // handleClosePopover();   // Popover 닫기
  };

  // Delete 클릭시 팝업에 전달
  const handleDeleteClick = (user: UserProps) => {
    setUserToDelete(user);  // 삭제할 유저 정보를 저장
    showAlert('삭제하시겠습니까?', 'info');  // 경고 메시지 출력
  };

  // Alert 'X' 클릭시
  const alertClose = () => {
    console.log('X 버튼 클릭');
    setAlertOpen(false);
  };
  
  // Alert 확인 클릭
  const handleConfirm = () => {
    console.log('확인 버튼 클릭');
    
    if (userToDelete) {
      console.log('삭제할 유저:', userToDelete);  // 삭제할 유저 정보 출력
      handleDeleteUser(userToDelete);  // 삭제 함수 호출
      setUserToDelete(null);  // 삭제 후 상태 초기화
    }

    setAlertOpen(false);
  };

  // Alert 취소 클릭
  const handleCancel = () => {
    console.log('취소 버튼 클릭');
    setAlertOpen(false);
  };


  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5} gap={0.5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={newUserPop}
        >
          New user
        </Button>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:search-line" />}
          onClick={fetchData}
        >
          Search
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    users.map((user) => user.user_id)
                  )
                }
                headLabel={[
                  { id: 'user_id', label: '사번' },
                  { id: 'user_nm', label: '성명' },
                  { id: 'sex', label: '성별' },
                  { id: 'email', label: '이메일' },
                  { id: 'phone_no', label: '전화번호' },
                  { id: 'pwd', label: '비밀번호' },
                  /*
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                   */
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.user_id}
                      row={row}
                      selected={table.selected.includes(row.user_id)}
                      onSelectRow={() => table.onSelectRow(row.user_id)}
                      onDeleteUser={handleDeleteClick}  // Delete 콜백 함수 전달
                      onEditUser={handleEditClick}  // Edit 콜백 함수 전달
                      // onClosePopover={handleClosePopover}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <UserViewPop open={open} handleClose={handleClose} user={userToEdit}/>

      <AlertSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        handleClose={alertClose}
        onConfirm={handleConfirm}  // 확인 버튼 클릭 시 호출
        onCancel={handleCancel}    // 취소 버튼 클릭 시 호출
        />

    </DashboardContent>

  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      console.log("========= 선택 =============");
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}

/*
iconify 라이브러리
npm install @iconify/react

add-line: 추가(+) 아이콘 (선 스타일)
home-line: 집 모양의 홈 아이콘 (선 스타일)
search-line: 검색(돋보기) 아이콘 (선 스타일)
user-line: 사용자(사람) 아이콘 (선 스타일)
settings-line: 설정(톱니바퀴) 아이콘 (선 스타일)
delete-line: 삭제(휴지통) 아이콘 (선 스타일)
edit-line: 편집(연필) 아이콘 (선 스타일)
arrow-left-line: 왼쪽 화살표 아이콘 (선 스타일)
arrow-right-line: 오른쪽 화살표 아이콘 (선 스타일)
arrow-up-line: 위쪽 화살표 아이콘 (선 스타일)
arrow-down-line: 아래쪽 화살표 아이콘 (선 스타일)
check-circle-line: 체크 원형 아이콘 (선 스타일)
close-line: 닫기(X) 아이콘 (선 스타일)
cloud-line: 클라우드 아이콘 (선 스타일)
folder-line: 폴더 아이콘 (선 스타일)
*/

