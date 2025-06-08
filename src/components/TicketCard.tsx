import { useNavigate } from 'react-router-dom';
import { CustomBox, CustomPaper, CustomText } from '.';
import { useAppSelector } from '../hooks/useAppSelector';
import { isCustomer, isTechnician } from '../utils/roles';

interface TicketCardProps {
  id: number;
  title: string;
  status: string;
  date: string;
  responsible?: string;
  priority?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
  id,
  title,
  status,
  date,
  responsible,
  priority 
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ticket/${id}/details`);
  };

  return (
    <CustomPaper 
      onClick={handleClick}
      sx={{
        borderRadius: 3, 
        boxShadow: 1,
        minWidth: 300, 
        maxWidth: 300,
        minHeight: 180,
        maxHeight: 180, 
        p: 3,
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      <CustomText variant='subtitle1' fontWeight='bold' gutterBottom>
        {`Chamado #${String(id). padStart(3, '0')}`}
      </CustomText>
      <CustomBox>
        <CustomText variant='body2' gutterBottom>
          <strong>Título:</strong> {title}
        </CustomText>
        {
          isTechnician(user?.userType) && (
            <CustomText variant='body2' gutterBottom>
              <strong>Prioridade:</strong> {priority}
            </CustomText>
          )
        }
        {
          isCustomer(user?.userType) && (
            <CustomText variant='body2' gutterBottom>
              <strong>Responsável:</strong> {responsible}
            </CustomText>
          )
        }
        <CustomText variant='body2' gutterBottom>
          <strong>Status:</strong> {status}
        </CustomText>
        <CustomText variant='body2'>
          <strong>Data:</strong> {date}
        </CustomText>
      </CustomBox>
    </CustomPaper>
  );
};

export default TicketCard;
