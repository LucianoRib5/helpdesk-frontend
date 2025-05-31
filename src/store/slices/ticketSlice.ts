import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from '../../features/ticket/ticketTypes';

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    deleteTicket: (state, action: PayloadAction<number>) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
  },
});

export const { setTickets, addTicket, updateTicket, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
