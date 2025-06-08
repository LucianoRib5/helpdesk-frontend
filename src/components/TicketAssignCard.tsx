import { Box, Card, Checkbox, IconButton, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { setTicketToEdit } from '../store/slices/ticketSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import TicketService from '../services/TicketService';

interface TicketAssignCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const TicketAssignCard: React.FC<TicketAssignCardProps> = ({
  id,
  title,
  description,
  status,
  setShowModal,
  setEditMode,
  checked,
  onCheckChange,
}) => {
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: () => TicketService.getTicketById(Number(id)),
    onSuccess: (data) => {
      dispatch(setTicketToEdit(data));
      setShowModal(true);
      setEditMode(true);
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

  const onEdit = () => mutate();

  return (
    <Card
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Checkbox
          checked={checked}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
        <Box>
          <Typography fontWeight='bold'>{title}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Status: {status}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onEdit}>
        <EditIcon fontSize='small' />
      </IconButton>
    </Card>
  );
};

export default TicketAssignCard;

