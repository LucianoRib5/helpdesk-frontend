import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  type SelectChangeEvent,
} from '@mui/material';
import { TicketStatus, TicketStatusLabels } from '../features/ticket/ticketTypes';
import { UserTypeEnum } from '../features/user/userTypes';

interface TicketDetailsCardProps {
  id: number;
  title: string;
  description: string;
  responsible: string;
  createdAt: string;
  status: number;
  userType: string;
  onStatusChange?: (status: number) => void;
  onUpdate?: () => void;
  onCloseTicket?: () => void;
}

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({
  id,
  title,
  description,
  responsible,
  createdAt,
  status,
  userType,
  onStatusChange,
  onUpdate,
  onCloseTicket,
}) => {
  const handleStatusChange = (event: SelectChangeEvent) => {
    onStatusChange?.(Number(event.target.value));
  };

  const handleUpdateButton = () => (
    <Button
      onClick={onUpdate}
      variant="contained"
      sx={{
        backgroundColor: '#E4E4E7',
        color: '#000',
        textTransform: 'none',
        borderRadius: '20px',
        fontWeight: 600,
        px: 2,
        boxShadow: 'none',
      }}
    >
      ATUALIZAR
    </Button>
  )

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold">
          Detalhes do Chamado #{id}
        </Typography>

        {userType === UserTypeEnum.TECHNICIAN ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Status:</Typography>
            <Select
              size="small"
              value={status}
              // onChange={handleStatusChange}
              sx={{ fontSize: '14px', minWidth: 180 }}
            >
              <MenuItem value="Em Progresso">Em Progresso</MenuItem>
              <MenuItem value="Aguardando avaliação">Aguardando avaliação</MenuItem>
            </Select>
            {handleUpdateButton()}
          </Box>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2">Status: {TicketStatusLabels[status as TicketStatus]}</Typography>
            {handleUpdateButton()}
            <Button
              onClick={onCloseTicket}
              variant="outlined"
              sx={{
                color: '#FF0000',
                borderColor: '#FF0000',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
              }}
              disabled={status !== TicketStatus.AWAITING_EVALUATION}
            >
              ENCERRAR CHAMADO
            </Button>
          </Box>
        )}
      </Box>

      <Typography variant="body2">
        <strong>Título:</strong> {title}
      </Typography>
      <Typography variant="body2">
        <strong>Descrição:</strong> {description}
      </Typography>
      <Typography variant="body2">
        <strong>Responsável:</strong> {responsible}
      </Typography>
      <Typography variant="body2">
        <strong>Data de Criação:</strong> {createdAt}
      </Typography>
    </Box>
  );
};

export default TicketDetailsCard;
