import {
  Checkbox,
  FormControlLabel,
  Stack,
  FormHelperText,
  Autocomplete,
  Dialog,
  DialogContent
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTicketSchema, type NewTicketSchema } from '../schemas/ticket.schema';
import {
  CustomText,
  CustomPaper,
  CustomBox,
  CustomInput,
  CustomButton,
} from '../components';
import TicketService from '../services/TicketService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { priorities, type CreateTicketPayload } from '../features/ticket/ticketTypes';
import { UserTypeEnum, type UserBasicInfo } from '../features/user/userTypes';
import { useAppSelector } from '../hooks/useAppSelector';
import { addTicket } from '../store/slices/ticketSlice';
import { isCustomer } from '../utils/roles';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface NewTicketFormProps {
  user: UserBasicInfo;
  asModal?: boolean;
  editMode?: boolean;
  onClose?: () => void;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>
}

const NewTicketForm: React.FC<NewTicketFormProps> = ({ 
  user, 
  asModal = false,
  editMode = false, 
  onClose,
  setEditMode
}) => {
  const { customers, currentCustomer } = useAppSelector((state) => state.customer);
  const { ticketToEdit } = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewTicketSchema>({
    resolver: zodResolver(newTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      priorityId: 0,
      customerId: isCustomer(user.userType) && currentCustomer ? currentCustomer.id : 0,
    },
  });

  const clearForm = () => {
    setValue('title', '');
    setValue('description', '');
    setValue('priorityId', 0);
    if (!isCustomer(user.userType)) setValue('customerId', 0);
  };

  const handleTicketSave = async (data: CreateTicketPayload) => {
    if (editMode && ticketToEdit) {
      return await TicketService.updateTicket(data, ticketToEdit.id);
    }
    return await TicketService.createTicket(data);
  };

  const invalidateTickets = () => {
    queryClient.invalidateQueries({
      queryKey: ['tickets'],
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleTicketSave,
    onSuccess: (response) => {
      invalidateTickets();

      if (!editMode) {
        dispatch(addTicket(response.data));
        clearForm();
      }
      
      if (editMode) setEditMode?.(false);

      setTimeout(() => {
        if (asModal && onClose) onClose();
      }, 100);
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: 'colored',
        }
      )
    }
  });

  const onSubmit = (data: CreateTicketPayload) => {
    if (!user) return;

    const customerId =
      user.userType === UserTypeEnum.CUSTOMER && currentCustomer
        ? currentCustomer.id
        : data.customerId;

    mutate({
      ...data,
      priorityId: data.priorityId,
      customerId,
      createdById: user.userId,
    });
  };

  const selectedPriority = watch('priorityId');

  useEffect(() => {
    if (ticketToEdit) {
      setValue('title', ticketToEdit.title);
      setValue('description', ticketToEdit.description);
      setValue('priorityId', ticketToEdit.priorityId);
      setValue('customerId', ticketToEdit.customerId);
    }
  }, [ticketToEdit, setValue]);

  const formContent = (
    <>
      <CustomText variant='h6' fontWeight='bold' gutterBottom>
        { editMode ? 'Editar Chamado' : 'Abrir um novo chamado' }
      </CustomText>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CustomBox mt={2}>
          <Controller
            name='title'
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label='Título'
                placeholder='Insira o título'
                register={register(field.name)}
                fieldError={errors.title}
              />
            )}
          />
        </CustomBox>

        <CustomBox mt={2}>
          {user?.userType !== UserTypeEnum.CUSTOMER && (
            <Controller
              name='customerId'
              control={control}
              render={({ field }) => {
                const selectedCustomer = customers.find((c) => c.id === field.value) || null;

                return (
                  <Autocomplete
                    options={customers}
                    value={selectedCustomer}
                    getOptionLabel={(option) => option.name}
                    filterOptions={(options, { inputValue }) => {
                      const query = inputValue.toLowerCase().replace(/\D/g, '');
                      return options.filter((customer) => {
                        const cpf = customer.cpf.replace(/\D/g, '');
                        const cnpj = (customer.cnpj || '').replace(/\D/g, '');
                        return cpf.includes(query) || cnpj.includes(query);
                      });
                    }}
                    onChange={(_, selected) => field.onChange(selected?.id || 0)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <CustomInput
                        {...params}
                        {...field}
                        label='Buscar por CPF ou CNPJ'
                        placeholder='Digite CPF ou CNPJ do cliente'
                        fieldError={errors.customerId}
                      />
                    )}
                  />
                );
              }}
            />
          )}
        </CustomBox>

        <CustomBox mt={2}>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label='Descrição'
                placeholder='Descreva o problema'
                multiline
                rows={4}
                register={register(field.name)}
                fieldError={errors.description}
              />
            )}
          />
        </CustomBox>

        <CustomBox mt={3}>
          <CustomText variant='subtitle2' gutterBottom>
            Prioridade
          </CustomText>
          <Stack direction='row' spacing={2}>
            {priorities
              .filter((priority) => priority.id !== undefined)
              .map((priority) => (
                <FormControlLabel
                  key={priority.id}
                  control={
                    <Checkbox
                      checked={selectedPriority === priority.id}
                      onChange={() => setValue('priorityId', priority.id)}
                      sx={{
                        color: '#76809B',
                        '&.Mui-checked': {
                          color: '#4F5D75',
                        },
                      }}
                    />
                  }
                  label={priority.label}
                />
              ))}
          </Stack>
          {errors.priorityId && (
            <FormHelperText error>{errors.priorityId.message}</FormHelperText>
          )}
        </CustomBox>

        <CustomBox mt={4}>
          <CustomButton
            variant='contained'
            disabled={isPending}
            sx={{
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            { editMode ? 'Salvar' : 'Abrir Chamado' }
          </CustomButton>
        </CustomBox>
      </form>
    </>
  );

  if (asModal) {
    return (
      <Dialog open onClose={onClose} fullWidth maxWidth='md'>
        <DialogContent dividers>
          <CustomBox sx={{ p: 1 }}>{formContent}</CustomBox>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <CustomPaper
      elevation={1}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 800,
        boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      {formContent}
    </CustomPaper>
  );
};

export default NewTicketForm;
