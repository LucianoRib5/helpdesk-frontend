import { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import type { TicketComment } from '../features/ticket/ticketTypes';
import SendIcon from '@mui/icons-material/Send';

interface CommentsCardProps {
  comments: TicketComment[];
  onCommentSubmit?: (message: string) => void;
}

const CommentsCard: React.FC<CommentsCardProps> = ({
  comments,
  onCommentSubmit,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onCommentSubmit?.(message.trim());
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '60%',
      }}
    >
      <Typography fontWeight="bold">Comentários</Typography>
      {
        comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.id} display="flex" gap={2} alignItems="flex-start">
              <Avatar alt={comment.userName} />
              <Box>
                <Typography fontWeight={600} fontSize="14px">
                  {comment.userName}
                </Typography>
                <Typography fontSize="14px">{comment.comment}</Typography>
                <Typography fontSize="12px" color="text.secondary">
                  {comment.updatedAt}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary" fontSize="14px">
            Nenhum comentário ainda.
          </Typography>
        )
      }

      <Box
        display="flex"
        alignItems="center"
        mt={1}
        sx={{
          borderRadius: '20px',
          backgroundColor: '#F9FAFB',
          px: 2,
          py: 1,
        }}
      >
        <TextField
          placeholder="Adicionar um comentário..."
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          sx={{ fontSize: '14px' }}
        />
        <IconButton onClick={handleSend} sx={{ color: '#666' }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CommentsCard;
