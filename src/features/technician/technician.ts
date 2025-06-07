export interface Technician {
  id: number;
  userId: number;
  assignedTicketsCount: number;
  statusId: number;
  workShiftStart: string;
  workShiftEnd: string;
}
