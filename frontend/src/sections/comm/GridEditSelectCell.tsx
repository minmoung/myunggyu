import React, { useEffect } from 'react';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { CommCode } from './yourTypes'; // CommCode 타입 임포트 필요

// 상위코드 타입 정의
interface CommCode {
    code_cd: string;
    code_nm: string;
}

interface GridEditSelectCellProps extends GridRenderEditCellParams {
    commCode: CommCode[]; // 부모로부터 전달받은 공통코드 배열
}

// 공통코드 가져오기
const GridEditSelectCell = (props: GridEditSelectCellProps) => {

    const { value, api, id, field, commCode } = props;

    useEffect(() => {
    
    }, []);


    const handleChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        // 셀 값 업데이트
        api.setEditCellValue({ id, field, value: newValue });
    
        // 즉시 편집 모드를 종료하지 않고, 값이 반영된 상태에서 셀 모드를 변경
        api.stopCellEditMode({ id, field });
    };

    return (
        <Select
            value={value || ""}
            autoFocus // 자동 포커스 설정
            fullWidth
            onChange={handleChange}
        >
            {commCode && commCode.length > 0 ? (
            commCode.map((code: CommCode) => (
                <MenuItem key={code.code_cd} value={code.code_cd}>
                {code.code_nm}
                </MenuItem>
            ))
            ) : (
            <MenuItem value=""> Loading... </MenuItem>
            )}
        </Select>
      );
    };

export default GridEditSelectCell;