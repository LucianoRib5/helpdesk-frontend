import { AppBar, type AppBarProps } from '@mui/material';

const CustomAppBar: React.FC<AppBarProps> = ({ children, ...rest }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#f4f4f4',
        color: 'black',
        boxShadow: 'none',
      }}
      {...rest}
    >
      {children}
    </AppBar>
  );
};

export default CustomAppBar;
