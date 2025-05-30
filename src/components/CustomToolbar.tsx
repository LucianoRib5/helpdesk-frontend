import React from 'react';
import { Toolbar, type ToolbarProps } from '@mui/material';

interface CustomToolbarProps extends ToolbarProps {
  children?: React.ReactNode;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ children, ...rest }) => {
  return (
    <Toolbar {...rest}>
      {children}
    </Toolbar>
  );
};

export default CustomToolbar;
