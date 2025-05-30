import { ListItem, ListItemText, type ListItemProps } from '@mui/material';

interface NavListItemProps extends ListItemProps {
  text: string;
  onClick?: () => void;
}

const NavListItem: React.FC<NavListItemProps> = ({ text, onClick, ...rest }) => {
  return (
    <ListItem
      button
      component="button"
      onClick={onClick}
      {...rest}
    >
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default NavListItem;
