import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTickets } from '../../store/slices/ticketSlice';
import { UserTypeEnum } from '../../features/user/userTypes';
import { isCustomer, isTechnician } from '../../utils/roles';
import { CustomBox, CustomText, LastTickets, NewTicketForm, TicketCard } from '../../components';
import { priorities, TicketStatus, TicketStatusLabels } from '../../features/ticket/ticketTypes';
import { formatDateToPtBR } from '../../utils/formatDate';
import TicketService from '../../services/TicketService';

const Home: React.FC = () => {
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

      const allTickets = await TicketService.getAllTickets(TicketStatus.OPEN);
      return allTickets;
    },
    enabled: !!user && (user.userType !== UserTypeEnum.CUSTOMER || !!customer.currentCustomer?.id),
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      dispatch(setTickets(data));
    }
  }, [data, isLoading, isError, dispatch]);

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
    ) : (
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
    )}
  </CustomBox>
);
}

export default Home;
