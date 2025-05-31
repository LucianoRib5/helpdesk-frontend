import type { CreateTicketPayload, Ticket } from '../features/ticket/ticketTypes'
import ApiService from './ApiService'

const { post } = ApiService

const TicketService = {
    createTicket: async (payload: CreateTicketPayload) => {
        return post<Ticket>('/tickets', payload)
    },
}

export default TicketService