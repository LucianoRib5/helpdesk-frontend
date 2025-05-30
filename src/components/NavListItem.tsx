import { ListItem, ListItemIcon, ListItemText, type ListItemProps } from '@mui/material';

interface NavListItemProps extends ListItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const NavListItem: React.FC<NavListItemProps> = ({ text, icon, onClick, ...rest }) => {
  return (
    <ListItem
      button
      component="button"
      onClick={onClick}
      sx={{
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover .MuiListItemText-root': {
          color: 'orange',
        },
      }}
      {...rest}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: '32px', color: 'inherit' }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default NavListItem;
