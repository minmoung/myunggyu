import { useState, useEffect } from 'react';
import { searchRows } from 'src/sections/comm/DatabaseApi';

// CommCode 타입 정의
interface CommCode {
  code_cd: string;
  code_nm: string;
}

const commCodeSearchUrl = '/api/code/codeSearch';

export function useFetchCommCode(upCodeCd: string) {
  const [commCode, setCommCode] = useState<CommCode[]>([]);
  const [codeLoading, setCodeLoading] = useState<boolean>(true);
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setCodeLoading(true);
        const response = await searchRows([{ up_code_cd: upCodeCd }], commCodeSearchUrl);
        setCommCode(response);
        setCodeLoading(false);
      } catch (error) {
        console.error('Error fetching comm codes:', error);
        setCodeError('Failed to fetch codes');
        setCodeLoading(false);
      }
    };
    fetchCodes();
  }, [upCodeCd]);

  return { commCode, codeLoading, codeError };
}
