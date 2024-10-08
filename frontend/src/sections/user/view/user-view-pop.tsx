import React, { useState, useEffect  } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import AlertSnackbar from 'src/sections/comm/AlertSnackbar';
import { UserProps } from '../user-table-row';

    interface UserFormData {
        tran_gb : string;
        user_id: string;
        user_nm: string;
        phone_no: string;
        email: string;
        pwd: string;
    }

    interface UserViewPopProps {
        open: boolean; // Dialog의 열림/닫힘 상태
        handleClose: () => void; // Dialog 닫는 함수
        user: UserProps | null;  // 선택된 유저 정보
    }

    const UserViewPop: React.FC<UserViewPopProps> = ({ open, handleClose, user }) => {
        const [showPassword, setShowPassword] = useState(false);
        const [errors, setErrors] = useState({
            user_id: false,
        });

        // formData의 타입을 명시적으로 지정
        const [formData, setFormData] = useState<UserFormData>({
            tran_gb: '',
            user_id: user?.user_id || '',
            user_nm: user?.user_nm || '',
            phone_no: user?.phone_no || '',
            email: user?.email || '',
            pwd: user?.pwd || '',
        });

    // 최초 로딩 시 formData 초기화 (기본값으로)
    useEffect(() => {
        // 서버에서 데이터를 가져오거나 기본값을 설정하는 로직을 여기에 추가
        // 여기서는 기본값을 설정하는 예시를 추가
        if (open) {
            console.log('== open시 초기화. ==');
        
            if(user)
            {
                setFormData({
                    tran_gb: 'update',
                    user_id: user.user_id,
                    user_nm: user.user_nm,
                    phone_no: user.phone_no,
                    email: user.email,
                    pwd: user.pwd,
                });
            }else{
                setFormData({
                    tran_gb: 'insert',
                    user_id: '',
                    user_nm: '',
                    phone_no: '',
                    email: '',
                    pwd: '',
            });
        }
    }
  }, [open, user]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

    // 폼 데이터 처리 로직
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };


    const validateForm = () => {
        // 필수값 체크 로직
        const validateErrors = {
            user_id: formData.user_id === '', // user_id가 비어 있으면 true
            user_nm: formData.user_nm === '', // user_id가 비어 있으면 true
            phone_no: formData.phone_no === '', // user_id가 비어 있으면 true
            email: formData.email === '', // user_id가 비어 있으면 true
            pwd: formData.pwd === '', // user_id가 비어 있으면 true
            
        };

        setErrors(validateErrors);
        // console.log("newErrors : ", validateErrors.user_id);

        if (validateErrors.user_id) {
            showAlert('사번은 필수 항목입니다', 'warning');  // 경고 메시지 출력
            return false; // 폼이 유효하지 않음을 반환
        }

        if (validateErrors.user_nm) {
            showAlert('성명은 필수 항목입니다', 'warning');  // 경고 메시지 출력
            return false; // 폼이 유효하지 않음을 반환
        }

        if (validateErrors.phone_no) {
            showAlert('전화번호는 필수 항목입니다', 'warning');  // 경고 메시지 출력
            return false; // 폼이 유효하지 않음을 반환
        }

        if (validateErrors.email) {
            showAlert('이메일은 필수 항목입니다', 'warning');  // 경고 메시지 출력
            return false; // 폼이 유효하지 않음을 반환
        }

        if (validateErrors.pwd) {
            showAlert('비밀번호는 필수 항목입니다', 'warning');  // 경고 메시지 출력
            return false; // 폼이 유효하지 않음을 반환
        }

        // return !validateErrors.user_id; // 에러가 없으면 true 반환
        return true;
    };

    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 필수값 체크
        if (!validateForm()) {
            return; // 필수값 체크에 실패하면 함수 종료
        }

        try {
        const response = await fetch(`${backUrl}/api/users/save`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        console.log("result : ", result); // 서버 응답 처리
        console.log("result.message : ", result.message); // 서버 응답 처리

        if(result.message)
        {
          // 중복된 사용자가 존재합니다.
          showAlert(result.message, 'warning');  // 경고 메시지 출력
          return;
        }

        handleClose(); // 다이얼로그 닫기
        } catch (error) {
        console.error('Error:', error);
        }
    };

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setAlertMessage(message);  // 메시지 정의
        setAlertSeverity(severity); // 메시지 타입 정의
        setAlertOpen(true);  // 메시지 오픈
    };

    // Alert '확인' 및 'X' 클릭시
    const alertClose = () => {
        setAlertOpen(false);
    };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '700px', // 원하는 픽셀 값으로 설정
          maxWidth: 'none', // 기본 maxWidth를 무시
        },
      }}
    >
      <DialogTitle>사용자 등록</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="userForm"
          onSubmit={handleSubmit} // 폼 제출 핸들러 추가
          sx={{
            display: 'flex',
            flexDirection: 'row', // 기본적으로 가로 방향
            flexWrap: 'wrap', // 공간 부족 시 줄바꿈
            gap: 0, // 필드 간의 간격
            '& .MuiTextField-root': {
              flex: '1 1 200px', // 최소 너비는 200px, 그 이상은 자동으로 늘어남
              m: 1,
            },
          }}
          noValidate
          autoComplete="off"
        >
          {/* 사번, 성명, 전화번호 */}
          <TextField
            required
            id="user_id"
            name="user_id"
            label="사번"
            value={formData.user_id}
            margin="dense"
            onChange={handleChange}
          />

          <TextField
            required
            id="user_nm"
            name="user_nm"
            label="성명"
            value={formData.user_nm}
            onChange={handleChange}
          />

          <TextField
            required
            id="phone_no"
            name="phone_no"
            label="전화번호"
            value={formData.phone_no}
            onChange={handleChange}
          />

          {/* 이메일, 비밀번호 */}
          <TextField
            required
            id="email"
            name="email"
            label="이메일"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            required
            id="pwd"
            name="pwd"
            label="비밀번호"
            value={formData.pwd}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" form="userForm">
          Save
        </Button>
      </DialogActions>

      <AlertSnackbar
        open={alertOpen} 
        message={alertMessage}
        severity={alertSeverity}
        handleClose={alertClose}
        onConfirm={alertClose}      // 확인 버튼 클릭 시 호출
        onCancel={alertClose}    // 취소 버튼 클릭 시 호출
        />
    </Dialog>

    
  );
};

export default UserViewPop;