import { CustomBox, CustomText, TicketCard, TicketFilter } from '../../components';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TicketStatus, TicketStatusLabels, type TicketFilterForm } from '../../features/ticket/ticketTypes';
import { formatDateToPtBR } from '../../utils/formatDate';
import { isCustomer, isTechnician } from '../../utils/roles';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setTickets } from '../../store/slices/ticketSlice';
import TicketService from '../../services/TicketService';

const TicketList: React.FC = () => {
  const { 
    customer: { currentCustomer},
    technician: { currentTechnician },
    auth: { user },
    ticket: { tickets }  
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const getTickets = async (filters: TicketFilterForm) => {
    if (!user) return [];
      if (isCustomer(user.userType) && currentCustomer) {
        const customerTickets = await TicketService.getTicketsByUserRoleId(currentCustomer.id, user.userType, undefined, filters);
        dispatch(setTickets(customerTickets));
        return;
      } else if (isTechnician(user.userType) && currentTechnician) {
        const technicianTickets = await TicketService.getTicketsByUserRoleId(currentTechnician.id, user.userType, undefined, filters);
        dispatch(setTickets(technicianTickets));
        return;
      }

    const allTickets = await TicketService.getAllTickets(undefined, filters);
    dispatch(setTickets(allTickets));
  }
  
  return (
    <CustomBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        p: 2,
        gap: 2
      }}
      >
      <CustomText variant='h5' fontWeight='bold' gutterBottom>
        Lista de chamados
      </CustomText>
      <TicketFilter onFilterChange={getTickets}/>
      <CustomBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {
          tickets.length > 0 ? (
            tickets.map((ticket) => {
              return (
                <TicketCard
                  key={ticket.id}
                  id={ticket.id}
                  title={ticket.title}
                  responsible={ticket.responsible || 'Não atribuído'}
                  status={TicketStatusLabels[ticket.statusId as TicketStatus] || 'Desconhecido'}
                  date={formatDateToPtBR(ticket.createdAt)}
                />
              )
            })
          ) : (
            <CustomText variant='body2' color='text.secondary'>
              Nenhum chamado encontrado.
            </CustomText>
          )
        }
      </CustomBox>
    </CustomBox>
  )
}

export default TicketList;
