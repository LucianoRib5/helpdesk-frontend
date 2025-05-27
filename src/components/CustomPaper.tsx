import { Paper, type PaperProps } from '@mui/material';

interface CustomPaperProps extends PaperProps {
  children: React.ReactNode;
}

const CustomPaper: React.FC<CustomPaperProps> = ({ children, ...rest }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, borderRadius: 2, width: '100%', maxWidth: 400 }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
