import { useForm, Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { CustomBox, CustomInput } from '../components';
import { useCallback, useEffect } from 'react';
import { priorities, statuses, type TicketFilterForm } from '../features/ticket/ticketTypes';

interface TicketFilterProps {
  onFilterChange: (data: TicketFilterForm) => void;
}

export const TicketFilter: React.FC<TicketFilterProps> = ({ onFilterChange }) => {
  const { control, handleSubmit, watch } = useForm<TicketFilterForm>();

  const onSubmit = useCallback((data: TicketFilterForm) => {
    onFilterChange(data);
  }, [onFilterChange]);

  const { title, status, priority } = watch();

  useEffect(() => {
    const subscription = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 300);

    return () => clearTimeout(subscription);
  }, [title, status, priority]);


  return (
    <CustomBox
      display="flex"
      gap={2}
      bgcolor="#f5f5f5"
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            label="Título"
            placeholder="Pesquisar Chamados..."
            fullWidth
            sx={{ minWidth: 700, maxWidth: 700 }}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            select
            label="Status"
            placeholder="Status"
            sx={{ minWidth: 200, maxWidth: 200 }}
          >
            {statuses.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.label}
              </MenuItem>
            ))}
          </CustomInput>
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            select
            label="Prioridade"
            placeholder="Prioridade"
            sx={{ minWidth: 200, maxWidth: 200 }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority.id} value={priority.id}>
                {priority.label}
              </MenuItem>
            ))}
          </CustomInput>
        )}
      />
    </CustomBox>
  );
};

export default TicketFilter;
