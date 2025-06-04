import type { 
  CloseTicketPayload, 
  CreateTicketPayload, 
  Ticket, 
  TicketFilters 
} from '../features/ticket/ticketTypes'
import type { PaginatedResponse } from '../types/paginatedResponse'
import ApiService from './ApiService'

const { post, put, get } = ApiService

const TicketService = {
  createTicket: async (payload: CreateTicketPayload) => {
    return post<Ticket>('/tickets', payload)
  },
  getTicketsByCustomerId: async (customerId: number, filters: TicketFilters = {}) => {
    const response = await get<PaginatedResponse<Ticket>>(`/tickets/customer/${customerId}`, {
      params: {
        title: filters.title,
        status: filters.status,
        priority: filters.priority,
        page: filters.page ?? 0,
        size: filters.size ?? 10,
        sortBy: filters.sortBy ?? 'createdAt',
        sortDir: filters.sortDir ?? 'desc',
      },
    })
    return response.data.content;
  },
  getAllTickets: async (filters: TicketFilters = {}): Promise<Ticket[]> => {
    const response = await get<PaginatedResponse<Ticket>>('/tickets', {
      params: {
        title: filters.title,
        status: filters.status,
        priority: filters.priority,
        page: filters.page ?? 0,
        size: filters.size ?? 10,
        sortBy: filters.sortBy ?? 'createdAt',
        sortDir: filters.sortDir ?? 'desc',
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
  }
}

export default TicketService
