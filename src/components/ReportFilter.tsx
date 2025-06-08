import {
  Button,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { reportFilterSchema, type ReportFilterForm } from '../schemas/report.schema';
import { priorities, statuses, type ReportPayload } from '../features/ticket/ticketTypes';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setReportData } from '../store/slices/ticketSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import type { AxiosError } from 'axios';
import { exportReportPDF } from '../utils/exportPDF';
import dayjs from 'dayjs';
import TicketService from '../services/TicketService';
import CustomBox from './CustomBox';
import CustomText from './CustomText';
import type { RefObject } from 'react';

interface ReportFilterProps {
  reportRef: RefObject<HTMLDivElement | null>;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ reportRef }) => {
  const dispatch = useAppDispatch();

    const handleExport = () => {
    if (reportRef.current) {
      exportReportPDF(reportRef.current);
    } else {
      toast.error('Erro ao exportar. Gráfico não encontrado.');
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFilterForm>({
    resolver: zodResolver(reportFilterSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      priorities: [],
      statuses: [],
    },
  });

  const getReports = useMutation({
    mutationFn: (data: ReportPayload) => TicketService.generateReport(data),
    onSuccess: (data) => {
      dispatch(setReportData(data));
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

  const handleChangeStatusSubmit = (data: ReportFilterForm) => {
    const { startDate, endDate, priorities, statuses } = data;
    console.log('Filter:', data);
    getReports.mutate({
      startDate: startDate ? new Date(startDate).toISOString() : '',
      endDate: endDate ? new Date(endDate).toISOString() : '',
      priorities,
      statuses,
    });
  };

  return (
    <CustomBox
      p={3}
      borderRadius={2}
      boxShadow={1}
      bgcolor='#fff'
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <CustomText variant='h5' fontWeight='bold'>
        Relatórios Estatísticos
      </CustomText>

      <CustomBox display='flex' flexWrap='wrap' gap={2}>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <DatePicker
              label='Data inicial'
              format='DD/MM/YYYY'
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : '')
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name='endDate'
          control={control}
          render={({ field }) => (
            <DatePicker
              label='Data final'
              format='DD/MM/YYYY'
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? date.toISOString() : '')
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.endDate,
                  helperText: errors.endDate?.message,
                },
              }}
            />
          )}
        />

        <Controller
          name='priorities'
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{minWidth: 200}}
              multiple
              options={priorities.filter((p) => p.id !== undefined)}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => field.onChange(data.map((d) => d.id))}
              renderInput={(params) => (
                <TextField {...params} label='Prioridade' fullWidth />
              )}
            />
          )}
        />
        <Controller
          name='statuses'
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{minWidth: 200}}
              multiple
              options={statuses.filter((s) => s.id !== undefined)}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => field.onChange(data.map((d) => d.id))}
              renderInput={(params) => (
                <TextField {...params} label='Status' fullWidth />
              )}
            />
          )}
        />
      </CustomBox>
      <CustomBox display='flex' gap={2}>
        <Button
          variant='contained'
          color='primary'
          sx={{ height: 40, px: 4, fontWeight: 600 }}
          onClick={handleSubmit(handleChangeStatusSubmit)}
        >
          GERAR
        </Button>
        <Button
          variant='outlined'
          sx={{
            height: 40,
            px: 4,
            bgcolor: '#f0f0f0',
            color: 'black',
            fontWeight: 600,
          }}
          disabled={!getReports.isSuccess}
          onClick={handleExport}
        >
          EXPORTAR
        </Button>
      </CustomBox>
    </CustomBox>
  );
};

export default ReportFilter;
