import type { CreateTicketPayload, Ticket } from '../features/ticket/ticketTypes'
import ApiService from './ApiService'

const { post, get } = ApiService

const TicketService = {
    createTicket: async (payload: CreateTicketPayload) => {
        return post<Ticket>('/tickets', payload)
    },
    getTicketsByCustomerId: async (customerId: number) => {
        return get<Ticket[]>(`/tickets/customer/${customerId}`, {})
    },
    getAllTickets: async () => {
        return get<Ticket[]>('/tickets', {})
    }
}

export default TicketService