import { Box, type BoxProps } from '@mui/material';

interface CustomBoxProps extends BoxProps {
  children: React.ReactNode;
}

const CustomBox: React.FC<CustomBoxProps> = ({ children, ...rest }) => {
  return (
    <Box {...rest}>
      {children}
    </Box>
  );
};

export default CustomBox;
