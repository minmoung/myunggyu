import { Button } from "@mui/material"
import { Iconify } from "src/components/iconify"

type CmmBtnProps = {
  text: string; // 부모로부터 버튼의 텍스트를 받는 prop
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // 클릭 이벤트 핸들러 prop
};

function CmmBtn({ text, onClick }: CmmBtnProps) {

    return (
    <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={onClick}
        sx={{
        width: '100px',
        }}
        >
        {text}
  </Button>
  );
}

export default CmmBtn;