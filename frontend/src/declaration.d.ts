import '@mui/x-data-grid';

declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: React.CSSProperties;
        columnHeaders? : React.CSSProperties & {
            '& .MuiDataGrid-columnHeader'?: React.CSSProperties;
            '& .MuiDataGrid-columnHeader:nth-child(1)'?: React.CSSProperties;
            '& .MuiDataGrid-columnHeader:last-child'?: React.CSSProperties;
            '& .MuiDataGrid-columnHeader:not(:first-of-type):not(:last-of-type)'?: React.CSSProperties;
        }
        // cell?: React.CSSProperties & {
        //     // 편집 모드 셀 스타일 추가
        //     '&.MuiDataGrid-cell--editing'?: React.CSSProperties & {
        //       // cellContent 스타일
        //       '& .MuiDataGrid-cellContent'?: React.CSSProperties; 
        //     };
        //   };
        cell?: React.CSSProperties & {
            '&.MuiDataGrid-cell--editing'?: React.CSSProperties;
        }
        '& .MuiDataGrid-cellContent'?: React.CSSProperties; 
        cellContent?: React.CSSProperties; // cellContent 스타일 추가
        columnSeparator? : React.CSSProperties;
        footerContainer? : React.CSSProperties;
        row? : React.CSSObject;
      };
    };
  }

  interface ComponentNameToClassKey {
    MuiDataGrid: keyof Components['MuiDataGrid'];
  }
}