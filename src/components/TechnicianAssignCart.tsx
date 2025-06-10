import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '../hooks/useAppSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TicketService from '../services/TicketService';
import type { AssignMultipleTicketsPayload } from '../features/ticket/ticketTypes';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface TechnicianAssignCartProps {
  ticketIds: number[];
}

type FormValues = {
  technician: number;
};

const TechnicianAssignCart: React.FC<TechnicianAssignCartProps> = ({ ticketIds }) => {
  const { technicians } = useAppSelector((state) => state.technician);
  const { handleSubmit, watch, control } = useForm<FormValues>();
  const queryClient = useQueryClient();

  const technician = watch('technician');

  const assignTickets = useMutation({
    mutationFn: (data: AssignMultipleTicketsPayload) => TicketService.assignMultipleTickets(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });
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

  const assignTicketsSubmit = (data: FormValues) => {
    assignTickets.mutate({
      ticketIds,
      technicianId: data.technician,
    });
  }

  return (
    <Card 
      sx={{
        maxWidth: 400, 
        borderRadius: 2, 
        boxShadow: 1,
        height: '100%', 
      }}>
      <CardContent>
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          Atribuir a um técnico
        </Typography>

        <form onSubmit={handleSubmit(assignTicketsSubmit)}>
          <FormControl fullWidth margin='normal' size='small'>
            <InputLabel id='technician-select-label'>Selecione o técnico</InputLabel>
            <Controller
              name='technician'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId='technician-select-label'
                  label='Selecione o técnico'
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                  }}
                >
                  {technicians.map((technician) => (
                    <MenuItem key={technician.id} value={technician.id}>
                      {technician.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Box mt={2}>
            <Button
              fullWidth
              type='submit'
              variant='outlined'
              sx={{
                height: 40,
                px: 4,
                bgcolor: '#f0f0f0',
                color: 'black',
                fontWeight: 600,
              }}
              disabled={
                assignTickets.isPending || ticketIds.length === 0 || !technician
              }
            >
              ATRIBUIR CHAMADO(S)
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default TechnicianAssignCart;
