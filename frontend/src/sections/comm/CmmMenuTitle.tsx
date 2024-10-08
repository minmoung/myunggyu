import { Box, Typography } from "@mui/material";

type CmmMenuTitleProps = {
  title: string;
};

function CmmMenuTitle({ title }: CmmMenuTitleProps) {

    return (
      <Box display="flex" alignItems="center" 
        mb={1} gap={0.5}>
        <Typography variant="h4" flexGrow={1}>
          {title}
        </Typography>
      </Box>
  );
}

export default CmmMenuTitle;