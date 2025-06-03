import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from '@mui/material';

interface CloseTicketModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (comment: string, rating: number) => void;
}

const CloseTicketModal: React.FC<CloseTicketModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(0);

  const handleConfirm = () => {
    if (rating !== null) {
      onConfirm(comment.trim(), rating);
      setComment('');
      setRating(0);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Encerrar Chamado</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            multiline
            minRows={4}
            placeholder="Adicionar comentário..."
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ borderRadius: '8px' }}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontSize="14px">Avaliação</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                backgroundColor: '#C9F5D1',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b2ecc1',
                },
              }}
            >
              CONFIRMAR
            </Button>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                backgroundColor: '#FFD6D6',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#fcbdbd',
                },
              }}
            >
              CANCELAR
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CloseTicketModal;
