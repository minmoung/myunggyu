import React from 'react';
import { Snackbar, Alert, AlertColor, Button } from '@mui/material';

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor; // 'error', 'warning', 'info', 'success' 중 하나
  handleClose: () => void;
  onConfirm?: () => void; // 확인 버튼 클릭시 호출되는 함수
  onCancel?: () => void; // 취소 버튼 클릭시 호출되는 함수
  duration?: number; // 알림창이 열려있는 시간 (ms)
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
    open,
    message,
    severity,
    handleClose,
    onConfirm,
    onCancel,
    duration = 3000,
}) => {
    // 취소 버튼을 표시할지 여부를 결정 (error, warning이 아니면 표시)
    const showCancelButton = severity !== 'error' && severity !== 'warning';
  
    // message의 줄바꿈을 처리하는 함수
    const formatMessage = (msg: string) =>
        msg.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
 

    return (

    <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            <div>{formatMessage(message)}</div>
            <div
                style={{
                    marginTop: 16,
                    display: 'flex',
                    justifyContent: 'flex-end', // 항상 오른쪽 정렬
                    width: '100%', // 버튼 컨테이너가 전체 너비를 가짐
                    gap: '4px', // 버튼 간의 간격
                }}
            >
            {!showCancelButton ? (
            // showCancelButton이 false일 때 확인 버튼과 취소 버튼 모두 렌더링
            
                <Button color="inherit" size="small" onClick={onConfirm}>
                    확인
                </Button>
                
            ) : (
                // showCancelButton이 true일 때 확인 버튼만 렌더링
                <>
                <Button color="inherit" size="small" onClick={onConfirm}>
                    확인
                </Button>
                <Button color="inherit" size="small" onClick={onCancel}>
                    취소
                </Button>
                </>
            )}
        </div>
        </Alert>
    </Snackbar>
    );
};

export default AlertSnackbar;