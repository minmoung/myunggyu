import React, { useState, useCallback, useEffect } from 'react';
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
import { MenuTableRow } from '../menu-table-row';
import { MenuTableHead } from '../menu-table-head';
import { TopMenuTableHead } from '../top-menu-table-head';
import { TopMenuProps, TopMenuTableRow } from '../top-menu-table-row';

import { TableEmptyRows } from '../table-empty-rows';
import { MenuTableToolbar } from '../menu-table-toolbar';
import { emptyRows, applyFilter, getComparator, applyFilterTop } from '../utils';

import type { MenuProps } from '../menu-table-row';
import MenuViewPop from './menu-view-pop';
import TopMenuViewPop from './top-menu-view-pop';


 

// ----------------------------------------------------------------------

export function MenuView() {
  const table = useTable();
  // const backUrl = process.env.REACT_APP_BACKEND_URL;
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const [filterName, setFilterName] = useState('');
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [topMenus, setTopMenus] = useState<TopMenuProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openTop, setOpenTop] = useState(false);
  const [alertType, setAlertType] = useState<'deleteMenu' | 'deleteTopMenu' | null>(null);
  

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const searchValue = { router: "someValue" }; // 보내고자 하는 데이터
  
      // POST 요청으로 데이터 전달
      const response = await fetch(`${backUrl}/api/menu/searchTop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보냄
        },
        body: JSON.stringify(searchValue), // 데이터 본문에 추가
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      setTopMenus(data);
      // setMenus(data);
      setLoading(false);

      console.log('Fetched Data:', data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [backUrl]);

  // 메뉴 데이터를 삭제하는 함수
  const handleDeleteMenu = async (menu: MenuProps) => {
    // e.preventDefault();

    try {
      const response = await fetch(`${backUrl}/api/menu/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        /* body: JSON.stringify(formData), */
        body: JSON.stringify(menuToDelete),
      });
      const result = await response.json();
      console.log(result); // 서버 응답 처리
      fetchData(); // 삭제후 재조회
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // 상위 메뉴 데이터를 삭제하는 함수
  const handleDeleteMenuTop = async (menuTop: TopMenuProps) => {
    // e.preventDefault();

    try {
      const response = await fetch(`${backUrl}/api/menu/deleteTop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        /* body: JSON.stringify(formData), */
        body: JSON.stringify(menuTopDelete),
      });
      const result = await response.json();
      console.log(result); // 서버 응답 처리
      fetchData(); // 삭제후 재조회
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // new menu 버튼 클릭시
  const newMenuPop = () => {
    setMenuToEdit(null);  // 삭제할 메뉴 정보를 저장
    handleOpen();  // 다이얼로그 오픈
  }

  // new menu GRP 버튼 클릭시
  const newTopMenuPop = () => {
    setMenuTopEdit(null);  // 삭제할 메뉴 정보를 저장
    handleOpenTop();  // 다이얼로그 오픈
  }

  // Mneu 다이얼로그 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // Top Mneu 다이얼로그 열기
  const handleOpenTop = () => {
    setOpenTop(true);
  };

  // Menu 다이얼로그 닫기
  const handleClose = () => {
    setOpen(false);
    // fetchData(); // 다이얼로그 닫은 후 데이터를 다시 조회
    // showAlert('This is an error message!', 'error');
  };

  // Top Menu 다이얼로그 닫기
  const handleCloseTop = () => {
    setOpenTop(false);
    fetchData(); // 다이얼로그 닫은 후 데이터를 다시 조회
  };

  // 컴포넌트가 마운트될 때 데이터를 한 번 가져옴
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dataFiltered: MenuProps[] = applyFilter({
    inputData: menus,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const dataFilteredTop: TopMenuProps[] = applyFilterTop({
    inputData: topMenus,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info', type: 'deleteMenu' | 'deleteTopMenu') => {
    setAlertMessage(message);  // 메시지 정의
    setAlertSeverity(severity); // 메시지 타입 정의
    setAlertType(type); // 구분값 정의
    setAlertOpen(true);  // 메시지 오픈
  };

  const [openPopover, setOpenPopover] = useState(null);
  const [menuToDelete, setMenuToDelete] = useState<MenuProps | null>(null);
  const [menuTopDelete, setMenuTopDelete] = useState<TopMenuProps | null>(null);
  const [menuToEdit, setMenuToEdit] = useState<MenuProps | null>(null);
  const [menuTopEdit, setMenuTopEdit] = useState<TopMenuProps | null>(null);

  // Menu Edit 클릭시 팝업에 전달
  const handleEditClick = (menu: MenuProps) => {
    setMenuToEdit(menu);  // 삭제할 메뉴 정보를 저장
    handleOpen();  // 다이얼로그 오픈
    // handleClosePopover();   // Popover 닫기
  };

  // Top Menu Edit 클릭시 팝업에 전달
  const handleEditTopClick = (topMenu: TopMenuProps) => {
    setMenuTopEdit(topMenu);  // 삭제할 상위메뉴 정보를 저장
    handleOpenTop();  // 다이얼로그 오픈
    // handleClosePopover();   // Popover 닫기
  };


  // Menu Delete 클릭시 팝업에 전달
  const handleDeleteClick = (menu: MenuProps) => {
    setMenuToDelete(menu);  // 삭제할 유저 정보를 저장
    showAlert('메뉴를 삭제하시겠습니까?', 'info', 'deleteMenu');
    // showAlert('삭제하시겠습니까?', 'info');  // 경고 메시지 출력
  };

  // Top Menu Delete 클릭시 팝업에 전달
  const handleDeleteTopClick = (topMenu: TopMenuProps) => {
    setMenuTopDelete(topMenu);  // 삭제할 유저 정보를 저장
    showAlert('상위 메뉴를 삭제하시겠습니까?', 'info', 'deleteTopMenu');
    // showAlert('삭제하시겠습니까?', 'info');  // 경고 메시지 출력
  };

  // Alert 'X' 클릭시
  const alertClose = () => {
    setAlertOpen(false);
  };
  
  // Alert 확인 클릭
  const handleConfirm = () => {
    
    if (alertType === 'deleteMenu' && menuToDelete) {
      console.log('삭제할 메뉴:', menuToDelete);  // 삭제할 메뉴 정보 출력
      handleDeleteMenu(menuToDelete);  // 삭제 함수 호출
      setMenuToDelete(null);  // 삭제 후 상태 초기화
    }

    if (alertType === 'deleteTopMenu' && menuTopDelete) {
      console.log('삭제할 상위 메뉴:', menuTopDelete);  // 삭제할 상위 메뉴 정보 출력
      handleDeleteMenuTop(menuTopDelete);  // 삭제 함수 호출 (필요 시 별도의 함수로 수정 가능)
      setMenuTopDelete(null);  // 삭제 후 상태 초기화
    }

    setAlertOpen(false);
    setAlertType(null);  // Alert 타입 초기화
  };

  // Alert 취소 클릭
  const handleCancel = () => {
    setAlertOpen(false);
  };


  return (
    <DashboardContent>
      <Card sx={{
        padding: 2,
        // 다른 스타일 속성 추가 가능
      }}
      >
      
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',  // 작은 해상도 (모바일)에서는 위아래 배치
              sm: 'row',     // 중간 이상 해상도에서는 좌우 배치
            },
            gap: 2, // 테이블 사이의 간격
          }}
        >
          <Scrollbar>
          <Box display="flex" alignItems="center" mb={0} gap={0.5}>
            <Typography variant="h4" flexGrow={1}>
              Menu Group
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={newTopMenuPop}
            >
              New Menu Grp
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
          <MenuTableToolbar
              numSelected={table.selected.length}
              filterName={filterName}
              onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />
            <TableContainer 
                sx={{
                  overflow: 'unset',
                  flexBasis: '50%',  // 기본적으로 두 테이블이 50%씩 차지
                  flexGrow: 1,       // 두 테이블이 균등하게 공간을 차지하도록 설정
                  minWidth: 0,       // flexbox 레이아웃에서 균등 분할을 위해 최소 너비 설정
                  
                }}
            >
              <Table sx={{ minWidth: 400 }}>
                <TopMenuTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={menus.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                   table.onSelectAllRows(
                     checked,
                     topMenus.map((topMenu) => topMenu.top_menu_id)
                   )
                  }
                  headLabel={[
                    { id: 'top_menu_id', label: '상위메뉴ID' },
                    { id: 'top_menu_nm', label: '상위메뉴명' },
                    { id: 'sort', label: '정렬순서' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFilteredTop
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <TopMenuTableRow
                        key={row.top_menu_id}
                        row={row}
                        selected={table.selected.includes(row.top_menu_id)}
                        onSelectRow={() =>  table.onSelectRow(row.top_menu_id)}
                        onDeleteUser={handleDeleteTopClick}  // Delete 콜백 함수 전달
                        onEditUser={handleEditTopClick}  // Edit 콜백 함수 전달
                        // onClosePopover={handleClosePopover}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, menus.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Scrollbar>
          <Box display="flex" alignItems="center" mb={0} gap={0.5}>
            <Typography variant="h4" flexGrow={1}>
              Menu
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={newMenuPop}
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
          <MenuTableToolbar
              numSelected={table.selected.length}
              filterName={filterName}
              onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value);
              table.onResetPage();
            }}
          />

            <TableContainer
                sx={{
                  overflow: 'unset',
                  flexBasis: '50%',  // 두 번째 테이블도 50% 차지
                  flexGrow: 1,       // 두 테이블이 균등하게 공간을 차지하도록 설정
                  minWidth: 0,       // 최소 너비 설정
                }}
            >
              <Table sx={{ minWidth: 800 }}>
                <MenuTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={menus.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      menus.map((menu) => menu.menu_id)
                    )
                  }
                  headLabel={[
                    { id: 'menu_id', label: '메뉴ID' },
                    { id: 'menu_nm', label: '메뉴명' },
                    { id: 'sort', label: '정렬순서' },
                    { id: 'insert_id', label: '입력자' },
                    { id: 'insert_date', label: '입력일자' },
                    { id: 'update_id', label: '수정자' },
                    { id: 'update_date', label: '수정일자' },
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
                      <MenuTableRow
                        key={row.menu_id}
                        row={row}
                        selected={table.selected.includes(row.menu_id)}
                        onSelectRow={() => table.onSelectRow(row.menu_id)}
                        onDeleteUser={handleDeleteClick}  // Delete 콜백 함수 전달
                        onEditUser={handleEditClick}  // Edit 콜백 함수 전달
                        // onClosePopover={handleClosePopover}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, menus.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>

          </Scrollbar>
        </Box>

        <TablePagination
          component="div"
          page={table.page}
          count={menus.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <MenuViewPop open={open} handleClose={handleClose} menu={menuToEdit}/>

      <TopMenuViewPop open={openTop} handleClose={handleCloseTop} menu={menuTopEdit}/>

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
      console.log("inputValue ::", inputValue);
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

