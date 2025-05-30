import { Typography, type TypographyProps } from '@mui/material';

interface CustomTextProps extends TypographyProps {
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ children, ...rest }) => {
  return (
    <Typography variant="h6" align="center" {...rest}>
      {children}
    </Typography>
  );
};

export default CustomText;
