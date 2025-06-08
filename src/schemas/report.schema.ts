import * as z from 'zod';

export const reportFilterSchema = z.object({
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().min(1, 'Required'),
  priorities: z.array(z.number()).optional(),
  statuses: z.array(z.number()).optional(),
});

export type ReportFilterForm = z.infer<typeof reportFilterSchema>;
