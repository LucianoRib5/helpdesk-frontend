import { Checkbox, FormControlLabel, type CheckboxProps } from '@mui/material';

interface CheckboxFieldProps extends Omit<CheckboxProps, 'onChange'> {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  ...rest
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default CheckboxField;
