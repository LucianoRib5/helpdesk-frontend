import { TextField, type TextFieldProps } from '@mui/material';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface CustomInputProps extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  name: string;
  label: string;
  register: UseFormRegisterReturn;
  fieldError?: FieldError;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  register,
  fieldError,
  ...rest
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      error={!!fieldError}
      helperText={fieldError?.message}
      margin="normal"
      {...register}
      {...rest}
    />
  );
};

export default CustomInput;
