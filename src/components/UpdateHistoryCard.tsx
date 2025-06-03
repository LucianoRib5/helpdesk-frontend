import { Box, Typography } from '@mui/material';
import type { TicketUpdate } from '../features/ticket/ticketTypes';

interface UpdateHistoryCardProps {
  updates: TicketUpdate[];
}

const UpdateHistoryCard: React.FC<UpdateHistoryCardProps> = ({ updates }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        width: '60%',
      }}
    >
      <Typography fontWeight="bold">Histórico de Atualizações</Typography>
      {
        updates.length > 0 ? (
          updates.map((update) => (
            <Box
              key={update.id}
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Typography fontSize="14px">{update.newValue}</Typography>
              <Typography fontSize="12px" color="text.secondary">
                {update.updateAt}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography fontSize="14px" color="text.secondary">
            Nenhuma atualização registrada.
          </Typography>
        )
      }
    </Box>
  );
};

export default UpdateHistoryCard;
