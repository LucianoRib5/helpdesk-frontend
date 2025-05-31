import { z } from 'zod';

export const newTicketSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  priorityId: z.number().int().positive('Selecione uma prioridade'),
  customerId: z.number().int().positive('Selecione um cliente'),
});

export type NewTicketSchema = z.infer<typeof newTicketSchema>;
