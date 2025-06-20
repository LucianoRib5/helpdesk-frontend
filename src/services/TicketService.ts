import type { 
  AddCommentPayload,
  AssignMultipleTicketsPayload,
  ChangeTicketStatusPayload,
  CloseTicketPayload, 
  CreateTicketPayload, 
  ReportPayload, 
  Ticket, 
  TicketFilters, 
  TicketReportData
} from '../features/ticket/ticketTypes'
import { UserTypeId } from '../features/user/userTypes'
import type { PaginatedResponse } from '../types/paginatedResponse'
import ApiService from './ApiService'

const { post, put, get } = ApiService

const TicketService = {
  createTicket: async (payload: CreateTicketPayload) => {
    return post<Ticket>('/tickets', payload)
  },
  getTicketsByUserRoleId: async (
    userRoleId: number,
    userType: string,
    statusId?: number,
    filters: TicketFilters = {}
  ) => {
    const userTypeId = UserTypeId[userType as keyof typeof UserTypeId];
    const response = await get<PaginatedResponse<Ticket>>(`/tickets/by-user-role/${userRoleId}`, {
      params: {
        userTypeId,
        title: filters.title,
        status: filters.status ?? statusId,
        priority: filters.priority,
        page: filters.page ?? 0,
        size: filters.size ?? 10,
        sortBy: filters.sortBy ?? 'createdAt',
        sortDir: filters.sortDir ?? 'desc',
      },
    })
    return response.data.content;
  },
  getAllTickets: async (statusId?: number, notAssigned?: boolean, filters: TicketFilters = {}): Promise<Ticket[]> => {
    const response = await get<PaginatedResponse<Ticket>>('/tickets', {
      params: {
        title: filters.title,
        status: filters.status ?? statusId,
        priority: filters.priority,
        page: filters.page ?? 0,
        size: filters.size ?? 10,
        sortBy: filters.sortBy ?? 'createdAt',
        sortDir: filters.sortDir ?? 'desc',
        notAssigned: notAssigned ?? false,
      },
    });
    return response.data.content;
  },
  getTicketById: async (id: number): Promise<Ticket> => {
    const response = await get<Ticket>(`/tickets/${id}`);
    return response.data;
  },
  closeTicket: async (payload: CloseTicketPayload) => {
    const { rating, ratingComment } = payload;
    return put<Ticket>(`/tickets/${payload.ticketId}/close`, {
      rating,
      ratingComment,
    });
  },
  addComment: async (payload: AddCommentPayload) => {
    const { comment, userId } = payload;
    return post<never>(`/tickets/${payload.ticketId}/add-comment`, {
      comment,
      userId,
    });
  },
  changeTicketStatus: async (payload: ChangeTicketStatusPayload) => {
    const { ticketId, statusId, updatedById } = payload;
    console.log('Changing ticket status:', payload);
    return put<never>(`/tickets/${ticketId}/change-status`, {
      statusId,
      updatedById
    });
  },
  generateReport: async (payload: ReportPayload) => {
    const { startDate, endDate, priorities, statuses} = payload;
    return post<TicketReportData>('/tickets/report', {
      startDate,
      endDate,
      priorities,
      statuses
    }).then(response => response.data);
  },
  assignMultipleTickets: async (payload: AssignMultipleTicketsPayload) => {
    const { ticketIds, technicianId } = payload;
    return post<never>(`/tickets/assign-to-technician/${technicianId}`, {
      ticketIds
    });
  },
  updateTicket: async (payload: CreateTicketPayload, ticketId: number) => {
    return (await put<Ticket>(`/tickets/${ticketId}`, payload));
  }
}

export default TicketService
