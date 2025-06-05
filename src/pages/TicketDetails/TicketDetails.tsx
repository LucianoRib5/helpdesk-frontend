import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDateToPtBR } from "../../utils/formatDate";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toast } from 'react-toastify';
import type { AddCommentPayload, ChangeTicketStatusPayload, CloseTicketPayload, Ticket } from "../../features/ticket/ticketTypes";
import { 
  CloseTicketModal,
  CommentsCard, 
  CustomBox, 
  TicketDetailsCard, 
  UpdateHistoryCard 
} from "../../components";
import TicketService from "../../services/TicketService";
import type { AxiosError } from "axios";

const TicketDetails: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [openCloseTicketModal, setOpenCloseTicketModal] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const invalidateTicketDetails = () => {
    queryClient.invalidateQueries({
      queryKey: ['ticketDetails', id],
    });
  }

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

  const closeTicket = useMutation({
    mutationFn: (data: CloseTicketPayload) => TicketService.closeTicket(data),
    onSuccess: () => {
      invalidateTicketDetails();
      toast.success('Chamado fechado com sucesso!', {
        autoClose: 3000,
        theme: "colored",
      });
      setOpenCloseTicketModal(false);
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: "colored",
        }
      )
    }
  });

  const handleCloseTicketSubmit = (rating: number | null, ratingComment: string | null) => {
    if (!ticket) return;

    closeTicket.mutate({
      ticketId: ticket.id,
      rating,
      ratingComment,
    });
  };

  const addComment = useMutation({
    mutationFn: (data: AddCommentPayload) => TicketService.addComment(data),
    onSuccess: () => {
      invalidateTicketDetails();
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: "colored",
        }
      )
    }
  });

  const handleCommentSubmit = (message: string) => {
    if (!ticket || !user) return;

    addComment.mutate({
      ticketId: ticket.id,
      comment: message,
      userId: user.userId,
    });
  }

    const changeStatus = useMutation({
    mutationFn: (data: ChangeTicketStatusPayload) => TicketService.changeTicketStatus(data),
    onSuccess: () => {
      invalidateTicketDetails();
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { message?: string })?.message,
        {
          autoClose: 3000,
          theme: "colored",
        }
      )
    }
  });

  const handleChangeStatusSubmit = (statusId: number) => {
    if (!ticket || !user) return;

    changeStatus.mutate({
      ticketId: ticket.id,
      statusId,
      updatedById: user.userId,
    });
  }

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
              onStatusChange={(statusId) => handleChangeStatusSubmit(statusId)}
              onUpdate={invalidateTicketDetails}
              onCloseTicket={() => setOpenCloseTicketModal(true)}
            />
            <CommentsCard
              comments={ticket.comments}
              ticketStatus={ticket.statusId}
              onCommentSubmit={(comment) => handleCommentSubmit(comment)}
            />
            <UpdateHistoryCard updates={ticket.updateHistory} />
          </>
        )
      }
      <CloseTicketModal 
        open={openCloseTicketModal}
        onClose={() => setOpenCloseTicketModal(false)}
        onConfirm={handleCloseTicketSubmit}
      />
    </CustomBox>
  )
}

export default TicketDetails;
