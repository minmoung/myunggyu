import React, { useEffect, useState, useRef } from 'react';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { MenuItem, Select } from '@mui/material';
import { searchRows } from 'src/sections/comm/DatabaseApi';
// import { CommCode } from './yourTypes'; // CommCode 타입 임포트 필요

// 상위코드 타입 정의
interface CommCode {
    code_cd: string;
    code_nm: string;
  }

// 공통코드 가져오기
const GridEditSelectCell = (params: GridRenderEditCellParams) => {
    const [commCode, setCommCode] = useState<CommCode[]>([]);
    const commCodeRef = useRef<CommCode[] | null>(null); // 캐싱용 Ref
    const { value, api, id, field } = params;
    // const [commCodeSearchUrl] = useState('/api/code/codeSearch/001');
    const commCodeSearchUrl = '/api/code/codeSearch/001';

    useEffect(() => {
      const fetchCodes = async () => {
        
        try {
          // 데이터를 가져오지 않았다면 fetch 수행
          if (!commCodeRef.current) {
            // console.log("==== CommCode Select ====");
            const response = await searchRows([{up_code_cd: "004"}], commCodeSearchUrl);
            console.log("front response  :: ", response);
            commCodeRef.current = response; // 데이터 캐싱
            setCommCode(response);
          } else {
            setCommCode(commCodeRef.current); // 캐싱된 데이터 사용
          }
        } catch (error) {
          console.error('Error fetching up codes:', error);
        }
      };

      fetchCodes();
    }, []);

    return (
      <Select
        value={value || ""}
        onChange={(event) => {
          api.setEditCellValue({ id, field, value: event.target.value });
        }}
      >
        {commCode && commCode.length > 0 ? (
          commCode.map((code) => (
            <MenuItem key={code.code_cd} value={code.code_cd}>
              {code.code_nm}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="">
            Loading...
          </MenuItem>
        )}
      </Select>
    );
  };

export default GridEditSelectCell;