import { List, type ListProps } from '@mui/material';

interface CustomListProps extends ListProps {
  children: React.ReactNode;
}

const CustomList: React.FC<CustomListProps> = ({ children, ...rest }) => {
  return (
    <List {...rest}>
      {children}
    </List>
  );
};

export default CustomList;
