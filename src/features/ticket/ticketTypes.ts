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
  responsible?: string | null;
}

export type TicketFilters = {
  title?: string;
  status?: number;
  priority?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

export const priorities = [
  { id: undefined, label: 'Todas' },
  { id: 1, label: 'Baixa' },
  { id: 2, label: 'Média' },
  { id: 3, label: 'Alta' },
];

export const statuses = [
  { id: undefined, label: 'Todos' },
  { id: 1, label: 'Aberto' },
  { id: 2, label: 'Em andamento' },
  { id: 3, label: 'Aguardando avaliação' },
  { id: 4, label: 'Fechado' },
];

export type TicketFilterForm = {
  title: string;
  status: number;
  priority: number;
};

export const TicketStatus = {
  OPEN: 1,
  IN_PROGRESS: 2,
  AWAITING_EVALUATION: 3,
  CLOSED: 4,
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Aberto',
  [TicketStatus.IN_PROGRESS]: 'Em Andamento',
  [TicketStatus.AWAITING_EVALUATION]: 'Aguardando Avaliação',
  [TicketStatus.CLOSED]: 'Fechado',
};
