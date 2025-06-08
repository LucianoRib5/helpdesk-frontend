import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTickets } from '../../store/slices/ticketSlice';
import { UserTypeEnum } from '../../features/user/userTypes';
import { isCustomer, isTechnician } from '../../utils/roles';
import { 
  CustomBox, 
  CustomText, 
  LastTickets, 
  NewTicketForm, 
  TicketAssignCard, 
  TicketCard 
} from '../../components';
import { priorities, TicketStatus, TicketStatusLabels } from '../../features/ticket/ticketTypes';
import { formatDateToPtBR } from '../../utils/formatDate';
import { setTechnicians } from '../../store/slices/technicianSlice';
import { Button } from '@mui/material';
import TicketService from '../../services/TicketService';
import TechnicianAssignCart from '../../components/TechnicianAssignCart';
import TechnicianService from '../../services/TechnicianService';

const Home: React.FC = () => {
  const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { auth, customer, technician, ticket } = useAppSelector((state) => state);
  const { user } = auth;

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      if (!user) return Promise.resolve([]);

      if (isCustomer(user.userType)) {
        const customerId = customer.currentCustomer?.id;
        if (!customerId) return Promise.resolve([]);
        const customerTickets = await TicketService.getTicketsByUserRoleId(customerId, user.userType, TicketStatus.OPEN);
        return customerTickets;
      } else if (isTechnician(user.userType)) {
        const technicianId = technician.currentTechnician?.id;
        if (!technicianId) return Promise.resolve([]);
        const technicianTickets = await TicketService.getTicketsByUserRoleId(technicianId, user.userType, TicketStatus.OPEN);
        return technicianTickets;
      }

      const allTickets = await TicketService.getAllTickets(TicketStatus.OPEN, true);
      return allTickets;
    },
    enabled: !!user && (user.userType !== UserTypeEnum.CUSTOMER || !!customer.currentCustomer?.id),
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      dispatch(setTickets(data));
    }
  }, [data, isLoading, isError, dispatch]);
  
  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => await TechnicianService.getAllAvailableTechnicians(),
    enabled:
      user?.userType === UserTypeEnum.SUPPORT_OPERATOR ||
      user?.userType === UserTypeEnum.ADMINISTRATOR,
  });

  useEffect(() => {
    if (technicians) {
      dispatch(setTechnicians(technicians));
    }
  }, [technicians, dispatch]);

  const handleCheckboxChange = (ticketId: number, checked: boolean) => {
    setSelectedTicketIds((prev) =>
      checked ? [...prev, ticketId] : prev.filter((id) => id !== ticketId)
    );
  };

 return (
  <CustomBox
    sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {user && user.userType === UserTypeEnum.CUSTOMER ? (
      <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <NewTicketForm user={user} />
        <LastTickets />
      </CustomBox>
    ) : user && user.userType === UserTypeEnum.TECHNICIAN ? (
      <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CustomText variant='h5' fontWeight='bold' gutterBottom>
          Chamados abertos
        </CustomText>
        <CustomBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {ticket.tickets.length > 0 ? (
            ticket.tickets.map((ticket) => {
              return (
                <TicketCard
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.title}
                  priority={priorities.find(p => p.id === ticket.priorityId)?.label || 'Não definido'}
                  responsible={ticket.responsible || 'Não atribuído'}
                  status={
                    TicketStatusLabels[ticket.statusId as TicketStatus] ||
                    'Desconhecido'
                  }
                  date={formatDateToPtBR(ticket.createdAt)}
                />
              );
            })
          ) : (
            <CustomText variant='body2' color='text.secondary'>
              Nenhum chamado encontrado.
            </CustomText>
          )}
        </CustomBox>
      </CustomBox>
    ) : (
      <CustomBox sx={{ display: 'flex', gap: 2 }}>
        <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '60%' }}>
          <CustomBox sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <CustomText variant='h5' fontWeight='bold' gutterBottom>
              Chamados abertos
            </CustomText>
            <Button
              type='submit'
              variant='outlined'
              sx={{
                height: 40,
                px: 4,
                color: 'black',
                fontWeight: 600,
              }}
              onClick={() => setShowModal(true)}
            >
              ABRIR CHAMADO
            </Button>
          </CustomBox> 
          {
            ticket.tickets.map((ticket) => {
              return (
                <TicketAssignCard
                  key={ticket.id}
                  description={ticket.description}
                  title={ticket.title}
                  status={TicketStatusLabels[ticket.statusId as TicketStatus] || 'Desconhecido'}
                  onEdit={() => console.log(`Edit ticket ${ticket.id}`)}
                  checked={selectedTicketIds.includes(ticket.id)}
                  onCheckChange={(checked) => handleCheckboxChange(ticket.id, checked)}
                />
              );
            })
          }
        </CustomBox>
        <TechnicianAssignCart ticketIds={selectedTicketIds}/>
        {showModal && user && (
          <NewTicketForm user={user} asModal onClose={() => setShowModal(false)} />
        )}
      </CustomBox>
    )}
  </CustomBox>
);
}

export default Home;
