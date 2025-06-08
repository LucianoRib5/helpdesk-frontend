import * as z from 'zod';

export const reportFilterSchema = z.object({
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  priorities: z.array(z.number()).optional(),
  statuses: z.array(z.number()).optional(),
});

export type ReportFilterForm = z.infer<typeof reportFilterSchema>;
