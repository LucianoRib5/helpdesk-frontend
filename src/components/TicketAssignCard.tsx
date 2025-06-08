import React from 'react';
import { Box, Card, Checkbox, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface TicketAssignCardProps {
  title: string;
  description: string;
  status: string;
  onEdit?: () => void;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

const TicketAssignCard: React.FC<TicketAssignCardProps> = ({
  title,
  description,
  status,
  onEdit,
  checked,
  onCheckChange,
}) => {
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

