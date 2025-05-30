import { Drawer, type DrawerProps } from '@mui/material';

interface CustomDrawerProps extends DrawerProps {
  drawerWidth?: number;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  drawerWidth = 240,
  children,
  ...rest
}) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
        },
      }}
      {...rest}
    >
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
