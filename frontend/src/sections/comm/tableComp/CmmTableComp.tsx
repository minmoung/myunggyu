import React, { useState, useCallback, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

import { TopMenuTableHead } from './top-menu-table-head';
import { MenuProps } from './menu-table-row';
import { TopMenuProps, TopMenuTableRow } from './top-menu-table-row';
import { TableEmptyRows } from './table-empty-rows';
import { emptyRows, getComparator, applyFilterTop, applyFilter } from './utils';
import { TableNoData } from './table-no-data';

type HeadLabel = { id: string; label: string }; // HeadLabel 타입 정의

type CmmTableCompProps<T> = {
    rows: T[];
    setRows: React.Dispatch<React.SetStateAction<T[]>>;
    headLabel: HeadLabel[];
    // columns: T[]; // 부모 컴포넌트에서 전달받을 컬럼 정의
    // editMode?: 'row' | 'cell'; // editMode를 부모에서 전달받기 위해 추가
    // getRowId: (row: T) => string | number; // 고유한 Row ID를 가져오기 위한 함수
    // status?: true | false
    // onRowSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
    // onCellClick?: (params: any) => void;
    // onRowClick?: (params: any) => void;
  };

function CmmTableComp<T>({ rows, setRows, headLabel}: CmmTableCompProps<T>) {

    const table = useTable();
    const [filterName, setFilterName] = useState('');
    const [menus, setMenus] = useState<MenuProps[]>([]);
    const [topMenus, setTopMenus] = useState<TopMenuProps[]>([]);
    const [menuTopDelete, setMenuTopDelete] = useState<TopMenuProps | null>(null);
    const [menTopEdit, setMenuTopEdit] = useState<TopMenuProps | null>(null);

    const dataFiltered: MenuProps[] = applyFilter({
        inputData: menus,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      });

    
    const notFound = !dataFiltered.length && !!filterName;

    const dataFilteredTop: TopMenuProps[] = applyFilterTop({
        inputData: topMenus,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
      });


    // Top Menu Delete 클릭시 팝업에 전달
    const handleDeleteTopClick = (topMenu: TopMenuProps) => {
      setMenuTopDelete(topMenu);  // 삭제할 유저 정보를 저장
    };

    // Top Menu Edit 클릭시 팝업에 전달
    const handleEditTopClick = (topMenu: TopMenuProps) => {
      setMenuTopEdit(topMenu);  // 삭제할 상위메뉴 정보를 저장
    };

    return (
        <TableContainer 
        sx={{
          overflow: 'unset',
          // flexBasis: '50%',  // 기본적으로 두 테이블이 50%씩 차지
          flexGrow: 1,       // 두 테이블이 균등하게 공간을 차지하도록 설정
          minWidth: 0,       // flexbox 레이아웃에서 균등 분할을 위해 최소 너비 설정
        }}
    >
      <Table sx={{ minWidth: 400 }}>
        <TopMenuTableHead
          order={table.order}
          orderBy={table.orderBy}
          rowCount={rows.length}
          numSelected={table.selected.length}
          onSort={table.onSort}
          onSelectAllRows={(checked) =>
           table.onSelectAllRows(
             checked,
             topMenus.map((topMenu) => topMenu.row_id)
           )
          }
          headLabel={headLabel}
        />
        <TableBody>
          {dataFilteredTop
            .slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
            .map((row) => (
              <TopMenuTableRow
                key={row.row_id}
                row={row}
                selected={table.selected.includes(row.row_id)}
                onSelectRow={() =>  table.onSelectRow(row.row_id)}
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
  );
}

export default CmmTableComp;


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


