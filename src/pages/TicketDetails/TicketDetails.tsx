import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { formatDateToPtBR } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { Ticket } from "../../features/ticket/ticketTypes";
import { 
  CommentsCard, 
  CustomBox, 
  TicketDetailsCard, 
  UpdateHistoryCard 
} from "../../components";
import TicketService from "../../services/TicketService";

const TicketDetails: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['ticketDetails', id],
    queryFn: async () => await TicketService.getTicketById(Number(id)),
    enabled: !!id,
  })

  useEffect(() => {
    if (data && !isLoading && !error) {
      setTicket(data);
    }
  }, [isLoading, data, error]); 

  return (
    <CustomBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {
        ticket && user && (
          <>
            <TicketDetailsCard
              id={ticket.id}
              title={ticket.title}
              description={ticket.description}
              responsible={ticket.responsible || 'Não atribuído'}
              createdAt={formatDateToPtBR(ticket.createdAt)}
              status={ticket.statusId}
              userType={user.userType}
              onStatusChange={(status) => console.log('Novo status:', status)}
              onUpdate={() => console.log('Atualizar chamado')}
              onCloseTicket={() => console.log('Encerrar chamado')}
            />
            <CommentsCard
              comments={ticket.comments}
              onCommentSubmit={(msg) => console.log('Novo comentário:', msg)}
            />
            <UpdateHistoryCard updates={ticket.updateHistory} />
          </>
        )
      }
    </CustomBox>
  )
}

export default TicketDetails;
