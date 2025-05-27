import React from 'react';
import { Typography, type TypographyProps } from '@mui/material';

interface TextProps extends TypographyProps {
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Typography variant="h6" align="center" mb={2} {...rest}>
      {children}
    </Typography>
  );
};

export default Text;
