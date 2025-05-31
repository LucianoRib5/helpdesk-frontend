import { Button, type ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...rest }) => {
  return (
    <Button variant="contained" type="submit" sx={{ mt: 2 }} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;
