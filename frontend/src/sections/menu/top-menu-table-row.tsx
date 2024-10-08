import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type TopMenuProps = {
  top_menu_id: string;
  top_menu_nm: string;
  sort: string;
  insert_id: string;
  insert_date: string;
  update_id: string;
  update_date: string;
};

type TopMenuTableRowProps = {
  row: TopMenuProps;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteUser: (menu: TopMenuProps) => void;  // 부모에서 전달된 삭제 함수
  onEditUser: (menu: TopMenuProps) => void;  // 부모에서 전달된 삭제 함수
};

export function TopMenuTableRow({ row, selected, onSelectRow, onDeleteUser, onEditUser}: TopMenuTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  // Popover 닫기 이벤트를 처리하는 함수
  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Edit 버튼 클릭 시 호출되는 함수
  const handleEdit = useCallback(() => {
    onEditUser(row);  // 부모의 onEditUser 호출하며 row 데이터를 전달
    handleClosePopover();
  }, [onEditUser, row, handleClosePopover]);

  // Delete 버튼 클릭 시 호출되는 함수
  const handleDelete = useCallback(() => {
    onDeleteUser(row);  // 부모의 onDeleteUser 호출하며 row 데이터를 전달
    handleClosePopover();
  }, [onDeleteUser, row, handleClosePopover]);

  // Alert the row information
  // const handleAlertRow = useCallback(() => {
  //    alert(`Row Details:\n${JSON.stringify(row, null, 2)}`);
  // }, [row]);

  const handleAlertRow = useCallback(() => {

  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={onSelectRow}>
        
        <TableCell>{row.top_menu_id}</TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar alt={row.user_nm} src={row.avatarUrl} /> */}
            {row.top_menu_nm}
          </Box>
        </TableCell>

        <TableCell>{row.sort}</TableCell>

        {/*
        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>
        */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => { handleAlertRow(); handleEdit(); }}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
