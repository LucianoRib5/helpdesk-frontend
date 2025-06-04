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
  onConfirm: (rating: number | null, ratingComment: string | null) => void;
}

const CloseTicketModal: React.FC<CloseTicketModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [ratingComment, setRatingComment] = useState<string | null>();

  const handleConfirm = () => {
    onConfirm(rating, ratingComment?.trim() || null);
    setRatingComment('');
    setRating(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Encerrar Chamado</DialogTitle>
      <DialogContent>
        <Box 
          display="flex" 
          flexDirection="column" 
          gap={2} 
          mt={1} 
          sx={{ width: '500px' }}
        >
          <TextField
            multiline
            minRows={4}
            placeholder="Adicionar comentário..."
            variant="outlined"
            value={ratingComment}
            onChange={(e) => setRatingComment(e.target.value)}
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
