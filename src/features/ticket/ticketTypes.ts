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
  comments: TicketComment[];
  updateHistory: TicketUpdate[];
}

export interface TicketComment {
  id: number;
  userName: string;
  updatedAt: string;
  comment: string;
}

export interface TicketUpdate {
  message: string;
  timestamp: string;
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

export interface CloseTicketPayload {
  ratingComment: string | null;
  rating: number | null;
  ticketId: number;
}

export interface AddCommentPayload {
  ticketId: number;
  comment: string;
  userId: number;
}

export interface ChangeTicketStatusPayload {
  ticketId: number;
  statusId: number;
  updatedById: number;
}

export interface ReportPayload {
  startDate: string;
  endDate: string;
  priorities?: number[];
  statuses?: number[];
}

interface CountDTO {
  label: string;
  count: number;
}

interface CountByDateDTO {
  date: string;
  count: number;
}

export interface TicketReportData {
  totalTickets: number;
  ticketsByStatus: CountDTO[];
  ticketsByPriority: CountDTO[];
  ticketsOverTime: CountByDateDTO[];
}

export interface AssignMultipleTicketsPayload {
  technicianId: number;
  ticketIds: number[];
}