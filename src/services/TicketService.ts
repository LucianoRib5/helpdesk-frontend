import type { CreateTicketPayload, Ticket, TicketFilters } from '../features/ticket/ticketTypes'
import type { PaginatedResponse } from '../types/paginatedResponse'
import ApiService from './ApiService'

const { post, get } = ApiService

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
  }
}

export default TicketService
