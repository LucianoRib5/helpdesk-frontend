import React from 'react';
import { Typography, type TypographyProps } from '@mui/material';

interface CustomTextProps extends TypographyProps {
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ children, ...rest }) => {
  return (
    <Typography variant="h6" align="center" mb={2} {...rest}>
      {children}
    </Typography>
  );
};

export default CustomText;
