export interface CreateTicketPayload {
    title: string;
    description: string;
    priorityId: number;
    customerId: number;
    createdById?: number;
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    statusId: number;
    priorityId: number;
    createdAt: string;
    updatedAt: string;
    rating?: number | null;
    ratingComment?: string | null;
    customerId: number;
    technicianId?: number | null;
}

export const priorities = [
  { id: 1, label: 'Baixa' },
  { id: 2, label: 'Média' },
  { id: 3, label: 'Alta' },
];
